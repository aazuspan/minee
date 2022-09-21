import fs from 'fs'
import tree from 'terminal-tree'
import { transformSync } from 'esbuild'
import _traverse, { NodePath } from '@babel/traverse'
import _generator from "@babel/generator"
import * as parser from '@babel/parser'

import { loadModule, Module, DependencyTree } from './module.js'

// See https://github.com/babel/babel/issues/13855
const traverse = (_traverse as any).default
const generate = (_generator as any).default

/**
 * Wrap a module's source code for bundling.
 * @param {Module} module - The module to wrap.
 * @param {string} requireIdentifier - The identifier to use for `require` calls. 
 * @return {string} The wrapped source code.
 */
const wrapModule = (module: Module, requireIdentifier: string): string => {
  const wrapped = `"${module.path}":
    function (exports, ${requireIdentifier}) {
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
 * Rename any `require` identifiers in a code block to avoid the Earth Engine Code Editor
 * making automatic GET requests when it sees them.
 * @param {string} code - A block of code.
 * @param {string} to - The replacement name.
 * @returns {string} The renamed code. This is re-generated from AST, so there may be formatting changes.
 */
const renameRequires = (code: string, to: string): string => {
  const ast = parser.parse(code)
  traverse(ast, {
    enter(path: NodePath) {
      if (path.isIdentifier({name: "require"})) {
        path.node.name = to
      }
    }
  })
 return generate(ast, {retainLines: true}).code
}

/**
 * Bundle a module into a single file.
 * @param {string} entry - The path to the module entry point, e.g. "users/username/module:script".
 * @param {object} [options]
 * @param {boolean} [options.header=true] - If true, a header will be included in the bundled file
 * with information about the source and license for the bundled modules.
 * @param {boolean} [options.minify=false] - If true, the bundled file will be minified.
 * @param {boolean} [options.keepNames=false] - If true, all identifiers will be preserved while 
 * minifying. Otherwise, minifying will mangle names to reduce file size (without affecting the public API).
 * @return {Promise<Bundle>} A promise that resolves to a Bundle object containing the bundled code.
 */
async function bundleModule (
  entry: string,
  { header = false, minify = true, keepNames = false } = {}
): Promise<Bundle> {
  // If we're not going to mangle identifiers, we need to replace `require` to avoid the
  // Code Editor making GET requests automatically.
  const mangling = minify && !keepNames
  const requireIdentifier = mangling ? "require" : "_requireBundled"

  const entryModule = await loadModule(entry)
  const modules = [entryModule, ...entryModule.listDependencies()]
  const wrapped = modules.map((module) => wrapModule(module, requireIdentifier))
  const head = header ? buildHeader(entryModule, modules) : ''

  let code = `
  var modules = {
    ${wrapped.join('\n')}
  };
  
  function loads(modules, entry) {
    var moduleCache = {};
    
    var ${requireIdentifier} = function (moduleName) {
      if (moduleCache[moduleName]) {
        return moduleCache[moduleName];
      }
      var exp = {};
      moduleCache[moduleName] = exp;
      
          return modules[moduleName](exp, ${requireIdentifier});
        };
        
        return ${requireIdentifier}(entry);
      }

      exports = loads(modules, "${entry}");
  `
  // Rename any `require` call to prevent the Code Editor from automatically running them.
  code = mangling ? code : renameRequires(code, requireIdentifier)
  
  if (minify) {
    code = transformSync(code, {
      minifyWhitespace: true,
      minifySyntax: true,
      minifyIdentifiers: !keepNames,
      target: 'es5'
    }).code
  }
  
  const output = `${head}${code}`
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
