var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import path from 'path';
import tree from 'terminal-tree';
import { transformSync } from 'esbuild';
import { loadModule } from './module.js';
const wrapModule = (module) => {
    const wrapped = `"${module.path}":
    function (exports, require) {
      ${module.code}
      return exports;
    },
  `;
    return wrapped;
};
const buildHeader = (entry, modules) => {
    const moduleTree = tree(entry.dependencyTree(), {
        symbol: false
    });
    let licenseList = 'Licenses\n---------\n';
    let licenseFound = false;
    modules.forEach((m) => {
        if (m.license.length === 0)
            return;
        licenseList += `* ${m.path}\n${m.license}\n`;
        licenseFound = true;
    });
    const header = `/*! Making manual changes to this bundled file is not recommended!

Dependencies
------------
${moduleTree}
${licenseFound ? licenseList : ''}
Bundled by minee (${new Date().toISOString()}).*/\n\n`;
    return header;
};
function bundleModule(entry, dest, { noHeader = false } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const entryModule = yield loadModule(entry);
        if (dest === undefined) {
            dest = path.resolve(`${entryModule.name}.bundled.js`);
        }
        const modules = [entryModule, ...entryModule.listDependencies()];
        const wrapped = modules.map((module) => wrapModule(module));
        const header = noHeader ? '' : buildHeader(entryModule, modules);
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
  `;
        const minified = transformSync(result, {
            minify: true,
            target: 'es5'
        }).code;
        const output = `${header}${minified}`;
        fs.writeFileSync(dest, output);
        return new Bundle(output, entryModule, modules, dest);
    });
}
class Bundle {
    constructor(code, entry, modules, dest) {
        this.code = code;
        this.entry = entry;
        this.modules = modules;
        this.dest = dest;
        this.dependencyTree = this.entry.dependencyTree();
    }
    compressionPercent() {
        const totalBytes = this.modules
            .map((m) => m.stats.size)
            .reduce((a, b) => a + Number(b), 0);
        const bundledBytes = fs.statSync(this.dest).size;
        return (1 - bundledBytes / totalBytes) * 100;
    }
}
export { bundleModule };
