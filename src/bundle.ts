import fs from 'fs'
import tree from 'terminal-tree'
import { transformSync } from 'esbuild'

import { loadModule, Module, DependencyTree } from './module.js'

/**
 * Wrap a module's source code for bundling.
 * @param {Module} module - The module to wrap.
 * @return {string} The wrapped source code.
 */
const wrapModule = (module: Module): string => {
  const wrapped = `"${module.path}":
    function (exports, require) {
      ${module.code}
      return exports;
    },
  `

  return wrapped
}

/**
 * Build header text for bundled modules.
 * @param {Module[]} modules - The modules to bundle.
 * @return {string} The header text.
 */
const buildHeader = (entry: Module, modules: Module[]): string => {
  const moduleTree = tree(entry.dependencyTree(), {
    symbol: false
  }) as string

  let licenseList = 'Licenses\n---------\n'
  let licenseFound = false
  modules.forEach((m) => {
    if (m.license.length === 0) return
    licenseList += `* ${m.path}\n${m.license}\n`
    licenseFound = true
  })

  const header = `/*! Making manual changes to this bundled file is not recommended!

Dependencies
------------
${moduleTree}
${licenseFound ? licenseList : ''}
Bundled by minee (${new Date().toISOString()}).*/\n\n`

  return header
}

/**
 * Bundle a module into a single file.
 * @param {string} entry - The path to the module entry point, e.g. "users/username/module:script".
 * @param {object} [options]
 * @param {boolean} [options.noHeader=false] - If false, a header will be included in the bundled file
 * with information about the source and license for the bundled modules.
 * @return {Promise<Bundle>} A promise that resolves to a Bundle object containing the bundled code.
 */
async function bundleModule (
  entry: string,
  { noHeader = false } = {}
): Promise<Bundle> {
  const entryModule = await loadModule(entry)
  const modules = [entryModule, ...entryModule.listDependencies()]
  const wrapped = modules.map((module) => wrapModule(module))
  const header = noHeader ? '' : buildHeader(entryModule, modules)

  const result = `
    var modules = {
        ${wrapped.join('\n')}
    };

    function loads(modules, entry) {
        var moduleCache = {};
      
        var require = function (moduleName) {
          if (moduleCache[moduleName]) {
              return moduleCache[moduleName];
          }
          var exp = {};
          moduleCache[moduleName] = exp;
      
          return modules[moduleName](exp, require);
        };
      
        return require(entry);
      }

      exports = loads(modules, "${entry}");
  `

  const minified = transformSync(result, {
    minify: true,
    target: 'es5'
  }).code
  const output = `${header}${minified}`

  return new Bundle(output, entryModule, modules)
}

/** Represents a bundled module. */
class Bundle {
  code: string
  entry: Module
  modules: Module[]
  dependencyTree: DependencyTree
  /**
   * @param {string} code - The bundled source code.
   * @param {Module} entry - The entry point module.
   * @param {Module[]} modules - All modules in the bundle.
   */
  constructor (code: string, entry: Module, modules: Module[]) {
    this.code = code
    this.entry = entry
    this.modules = modules
    this.dependencyTree = this.entry.dependencyTree()
  }

  /**
   * Calculate the percent compression from the original scripts to the bundled, minified output.
   * @return {number} The percent compression.
   */
  compressionPercent (): number {
    const totalBytes = this.modules
      .map((m) => m.stats.size)
      .reduce((a, b) => a + Number(b), 0)
    const bundledBytes = this.code.length
    return (1 - bundledBytes / totalBytes) * 100
  }

  /**
   * Write the bundled source code to a local file.
   * @param {string} dest - The file path to write to.
   * @param {boolean} [overwrite=false] - If true, overwrite the file if it already exists.
   */
  write (dest: string, overwrite: boolean = false): void {
    if (fs.existsSync(dest) && !overwrite) {
      throw new Error(`File already exists: ${dest}. Set 'overwrite=true' or choose a different destination path.`)
    }
    fs.writeFileSync(dest, this.code)
  }
}

export type { Bundle }
export { bundleModule }
