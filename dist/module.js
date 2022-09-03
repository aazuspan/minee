var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { join } from 'path';
import { fs as memfs } from 'memfs';
import { traverse } from '@babel/core';
import * as parser from '@babel/parser';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node/index.js';
import Spinner from '@slimio/async-cli-spinner';
import chalk from 'chalk';
import * as auth from './auth.js';
import * as errors from './errors.js';
class Module {
    constructor(path, repository, code, stats, commit) {
        this.parseDependencies = () => {
            const reqs = [];
            traverse(this.ast, {
                CallExpression(path) {
                    const node = path.node;
                    if (node.callee.type === 'Identifier' &&
                        node.callee.name === 'require') {
                        const arg = node.arguments[0];
                        if (arg.type === 'StringLiteral') {
                            reqs.push(arg.value);
                        }
                    }
                }
            });
            return reqs;
        };
        this.parseLicense = () => {
            const comments = this.ast.comments;
            if (comments === undefined || comments === null) {
                return '';
            }
            return comments
                .filter((c) => c.type === 'CommentBlock' && c.value.includes('@license'))
                .map((c) => c.value)
                .join('\n\n');
        };
        this.path = path;
        this.repository = repository;
        this.code = code;
        this.stats = stats;
        this.commit = commit;
        this.ast = parser.parse(code);
        this.license = this.parseLicense();
        this.name = path.split(':')[1].split('/').pop();
        this.dependencies = undefined;
    }
    listDependencies() {
        if (this.dependencies === undefined) {
            throw new Error('This module has unloaded dependencies. Try rebuilding the module with `loadDependencies=true`.');
        }
        let downstream = [...this.dependencies];
        let queue = [...this.dependencies];
        while (queue.length > 0) {
            const current = queue.pop();
            const loadedPaths = downstream.map((s) => s.path);
            const deps = current.dependencies;
            const next = deps.filter((s) => !loadedPaths.includes(s.path));
            queue = queue.concat(next);
            downstream = downstream.concat(next);
        }
        return downstream;
    }
    checkForCircularImports() {
        const scripts = this.listDependencies();
        for (const script of scripts) {
            const requiredPaths = script.parseDependencies();
            if (requiredPaths.includes(this.path)) {
                throw new errors.CircularDependencyError(`Circular dependency found between ${this.path} and ${script.path}!`, this, script);
            }
            script.checkForCircularImports();
        }
    }
    loadDependencies(loaded = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            loaded[this.path] = this;
            const dependencyPaths = this.parseDependencies();
            const dependencies = yield Promise.all(dependencyPaths
                .filter((p) => !(p in loaded))
                .map((p) => {
                if (p in loaded) {
                    return loaded[p];
                }
                return loadModule(p, { loadDependencies: false });
            }));
            yield Promise.all(dependencies.map((s) => __awaiter(this, void 0, void 0, function* () { return yield s.loadDependencies(loaded); })));
            this.dependencies = dependencies;
            return dependencies;
        });
    }
    dependencyTree() {
        if (this.dependencies === undefined) {
            throw new Error('This module has unloaded dependencies. Rebuild the module with `loadDependencies=true`.');
        }
        const key = `${this.path} (#${this.commit})`;
        if (this.dependencies.length === 0)
            return key;
        const children = this.dependencies.map((s) => s.dependencyTree());
        return { [key]: children };
    }
}
class Repository {
    constructor(path) {
        this.path = path;
        this.name = path.split('/').pop();
        this.username = path.split('/')[1];
        this.url = `https://earthengine.googlesource.com/${path}`;
        this.localPath = `/${this.name}`;
    }
    clone(showProgress = true) {
        return __awaiter(this, void 0, void 0, function* () {
            class DummySpinner {
                contructor() { }
                succeed() { }
                failed() { }
            }
            const prettyPath = chalk.blue.bold(this.path);
            const spinner = showProgress
                ? new Spinner({ color: 'cyan' }).start(`Cloning ${prettyPath}...`)
                : new DummySpinner();
            try {
                yield git.clone({
                    fs: memfs,
                    http,
                    dir: this.localPath,
                    url: this.url,
                    onAuth: () => ({ password: auth.loadGitCredentials() })
                });
                spinner.succeed(`Cloned ${prettyPath}!`);
            }
            catch (err) {
                spinner.failed(`Failed to clone ${prettyPath}!`);
                const gitHttpError = err instanceof git.Errors.HttpError;
                if (gitHttpError && [400, 401].includes(err.data.statusCode)) {
                    throw new errors.GitAuthenticationError(err.data.response);
                }
                if (gitHttpError && err.data.statusCode === 404) {
                    throw new errors.RepositoryNotFoundError(err.data.response, this);
                }
                throw err;
            }
            return this.localPath;
        });
    }
}
function loadModule(entry, { showProgress = true, loadDependencies = true, allowCircular = false } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        validateModulePath(entry);
        const relPath = entry.split(':')[1];
        const repository = new Repository(entry.split(':')[0]);
        const localPath = join(repository.localPath, relPath);
        if (!memfs.existsSync(repository.localPath)) {
            yield repository.clone(showProgress);
        }
        if (!memfs.existsSync(localPath)) {
            throw new errors.ModuleNotFoundError(`Module ${entry} not found!`, entry);
        }
        const code = memfs.readFileSync(localPath, 'utf8');
        const stats = memfs.statSync(localPath, { throwIfNoEntry: true });
        let commit;
        try {
            const commits = yield git.log({
                fs: memfs,
                dir: repository.localPath,
                filepath: relPath,
                depth: 1,
                ref: 'master'
            });
            commit = commits[0].oid.slice(0, 7);
        }
        catch (err) {
            commit = 'Unknown';
        }
        const module = new Module(entry, repository, code, stats, commit);
        if (loadDependencies) {
            yield module.loadDependencies();
            if (!allowCircular) {
                yield module.checkForCircularImports();
            }
        }
        return module;
    });
}
const validateModulePath = (modulePath) => {
    const parts = modulePath.split(':');
    const invalid = parts.length !== 2 ||
        parts[0].split('/').length < 3 ||
        parts[1].length === 0;
    if (invalid) {
        throw new errors.InvalidModulePathError(`Entry path '${modulePath}' does not follow the format 'users/username/repository:module'.`, modulePath);
    }
};
export { loadModule };
