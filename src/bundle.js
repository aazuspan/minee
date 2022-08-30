import fs from "fs";
import babelMinify from "babel-minify";
import path from "node:path";
import tree from "terminal-tree";

import loadModule from "./module.js";

/**
 * Wrap a module's source code for bundling.
 * @param {Module} module - The module to wrap.
 * @return {string} The wrapped source code.
 */
const wrapModule = (module) => {
  const wrapped = `"${module.path}":
    function (exports, require) {
      ${module.code}
      return exports;
    },
  `;

  return wrapped;
};

/**
 * Bundle a module into a single file.
 * @param {string} entry - The path to the module entry point, e.g. "users/username/module:script".
 * @param {string} [dest] - The file path to write the bundled module. If none is given, the file is
 * written to "<entry>.bundled.js"
 * @return {string} The contents of the bundled module.
 */
export default async function bundleModule(entry, dest) {
  const entryModule = await loadModule(entry, {showProgress: true, loadDependencies: true, allowCircular: false});
  dest = path.resolve(dest || `${entryModule.name}.bundled.js`);

  const modules = [entryModule, ...(await entryModule.listDependencies())];
  const wrapped = modules.map((module) => wrapModule(module));

  let licenseList = "Licenses\n---------\n";
  let licenseFound = false;
  modules.forEach((m) => {
    if (!m.license) return;
    licenseList += `* ${m.path}\n${m.license}\n`;
    licenseFound = true;
  });

  const header = `/*! Making manual changes to this bundled file is not recommended!

Dependencies
------------
${tree(entryModule.dependencyTree(), {symbol: false})}
${licenseFound ? licenseList : ""}
Bundled by minee (${new Date().toISOString()}).*/`;

  let result = `
    var modules = {
        ${wrapped.join("\n")}
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
  `;

  result = `${header}\n\n${babelMinify(result).code}`;

  fs.writeFileSync(dest, result);

  return new Bundle(result, entryModule, modules, dest);
}

/** Represents a bundled module. */
class Bundle {
  /**
   * @param {string} code - The bundled source code.
   * @param {Module} entry - The entry point module.
   * @param {Module[]} modules - All modules in the bundle.
   * @param {string} dest - The file path to write the bundled module.
   */
  constructor(code, entry, modules, dest) {
    this.code = code;
    this.entry = entry;
    this.modules = modules;
    this.dest = dest;
  }

  /**
   * Calculate the percent compression from the original scripts to the bundled, minified output.
   * @return {number} The percent compression.
   */
  compressionPercent() {
    const totalBytes = this.modules
      .map((m) => m.stats.size)
      .reduce((a, b) => a + b, 0);
    const bundledBytes = fs.statSync(this.dest).size;
    return (1 - bundledBytes / totalBytes) * 100;
  }
}
