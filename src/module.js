import { join } from "node:path";
import { fs as memfs } from "memfs";
import { traverse } from "@babel/core";
import * as parser from "@babel/parser";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node/index.js";
import Spinner from "@slimio/async-cli-spinner";
import chalk from "chalk";
import * as utils from "./utils.js";
import * as errors from "./errors.js";

/** A Module represents a single Earth Engine source code file. */
class Module {
  constructor(path, repository, code, stats, commit) {
    this.path = path;
    this.repository = repository;
    this.code = code;
    this.stats = stats;
    this.commit = commit;
    this.ast = parser.parse(code);
    this.license = this.parseLicense();
    this.name = path.split(":")[1].split("/").pop();
    this.dependencies = undefined;
  }

  /**
   * Get a flat array of all scripts required downstream of this script.
   * @returns {Script[]} All scripts required downstream of this script.
   */
  listDependencies() {
    let downstream = [...this.dependencies];
    let queue = [...this.dependencies];
    while (queue.length > 0) {
      const current = queue.pop();
      const loadedPaths = downstream.map((s) => s.path);
      const next = current.dependencies.filter(
        (s) => !loadedPaths.includes(s.path)
      );

      queue = queue.concat(next);
      downstream = downstream.concat(next);
    }

    return downstream;
  }

  /**
   * Recursively check for circular imports downstream of this module. Throw if any are found.
   *
   * Note: This will load all dependencies if they were not previously loaded.
   *
   * @throws {CircularDependencyError} If any circular import is found between modules downstream of this module.
   */
  checkForCircularImports() {
    const scripts = this.listDependencies();

    for (let script of scripts) {
      let requiredPaths = script.parseDependencies();
      if (requiredPaths.includes(this.path)) {
        throw new errors.CircularDependencyError(
          `Circular dependency found between ${this.path} and ${script.path}!`,
          this,
          script
        );
      }

      script.checkForCircularImports();
    }
  }

  /**
   * Parse all downstream dependencies and load them.
   *
   * @param {string[]} [loaded] - An optional list of already loaded script paths. This is used internally to avoid
   * circular dependencies, and should not be passed by users.
   * @returns {object} Loaded scripts required downstream of this script.
   */
  async loadDependencies(loaded) {
    loaded = loaded || {};
    loaded[this.path] = this;

    const dependencyPaths = this.parseDependencies();

    const dependencies = await Promise.all(
      dependencyPaths.map((p) => {
        if (p in loaded) {
          return loaded[p];
        }
        return loadModule(p);
      })
    );

    this.dependencies = dependencies;

    return dependencies;
  }

  /**
   * Build a dependency tree from all downstream scripts.
   *
   * @returns {object}
   */
  dependencyTree() {
    const key = `${this.path} (#${this.commit})`;
    if (this.dependencies.length === 0) return key;
    const children = this.dependencies.map((s) => s.dependencyTree());
    return { [key]: children };
  }

  /**
   * Parse all module paths required by the root module code.
   * @return {string[]} The path of all modules required by the given code.
   */
  parseDependencies = () => {
    const reqs = [];
    traverse(this.ast, {
      CallExpression(path) {
        if (path.node.callee.name === "require") {
          const modulePath = path.node.arguments[0].value;
          if (!reqs.includes(modulePath)) {
            reqs.push(modulePath);
          }
        }
      },
    });

    return reqs;
  };

  /**
   * Parse a license code block from the module AST. Currently,
   * this only supports blocks that include a `@license` tag.
   *
   * @return {string} The license code block.
   */
  parseLicense = () => {
    return this.ast.comments
      .filter((c) => c.type === "CommentBlock" && c.value.includes("@license"))
      .map((c) => c.value)
      .join("\n\n");
  };
}

/** A Repository contains one or more Earth Engine modules. */
class Repository {
  /**
   * Create an Earth Engine repository from its root path.
   * @param {string} path - The path to the root of the Earth Engine repository, e.g. "users/username/repo".
   */
  constructor(path) {
    this.path = path;
    this.name = path.split("/").pop();
    this.username = path.split("/")[1];
    this.url = `https://earthengine.googlesource.com/${path}`;
    this.localPath = `/${this.name}`;
  }

  /**
   * Git clone the module repository into memory.
   * @param {boolean} [showProgress=true] - If true, a spinner will display progress.
   * @return {string} Promise object representing the cloned directory contents.
   */
  async clone(showProgress = true) {
    class DummySpinner {
      contructor() {}
      succeed() {}
      failed() {}
    }
    const prettyPath = chalk.blue.bold(this.path);
    const spinner = showProgress
      ? new Spinner({ color: "cyan" }).start(`Cloning ${prettyPath}...`)
      : new DummySpinner();

    try {
      await git.clone({
        fs: memfs,
        http: http,
        dir: this.localPath,
        url: this.url,
        onAuth: () => ({ password: utils.loadGitCredentials() }),
      });

      spinner.succeed(`Cloned ${prettyPath}!`);
    } catch (err) {
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
  }
}

/**
 * Create and load an Earth Engine module from an entry path.
 *
 * @param {string} entry - The path to the entry Earth Engine module, e.g. "users/username/repository:module".
 * @param {boolean} [showProgress=true] - If true, progress spinners will be when when cloning repositories.
 * @param {boolean} [loadDependencies=true] - If true, all downstream modules will be loaded and stored in
 * the `dependencies` property of the loaded module.
 * @param {boolean} [allowCircular=false] - If true, circular import errors will be ignored when loading
 * dependencies.
 * @returns {Module} A loaded module object.
 */
export default async function loadModule(
  entry,
  { showProgress = true, loadDependencies = true, allowCircular = false } = {}
) {
  validateModulePath(entry);

  const relPath = entry.split(":")[1];
  const repository = new Repository(entry.split(":")[0]);
  const localPath = join(repository.localPath, relPath);
  let code;
  let stats;
  let commit;

  if (!memfs.existsSync(repository.localPath)) {
    await repository.clone(showProgress);
  }

  try {
    code = memfs.readFileSync(localPath, "utf8");
    stats = memfs.statSync(localPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new errors.ModuleNotFoundError(`Module ${entry} not found!`, entry);
    }
    throw err;
  }

  try {
    const commits = await git.log({
      fs: memfs,
      dir: repository.localPath,
      filepath: relPath,
      depth: 1,
      ref: "master",
    });
    // Grab the short hash
    commit = commits[0].oid.slice(0, 7);
  } catch (err) {
    commit = "Unknown";
  }

  const module = new Module(entry, repository, code, stats, commit);

  if (loadDependencies) {
    await module.loadDependencies();
    if (!allowCircular) {
      await module.checkForCircularImports();
    }
  }

  return module;
}

/**
 * Check if an Earth Engine module path follows a valid format.
 *
 * This isn't an exhaustive check against Earth Engine filename requirements, but does
 * ensure that the path is at least parseable and contains the correct pieces.
 *
 * @param {string} module - The path to an Earth Engine module, e.g. users/username/repository:module.
 * @returns {boolean} True if the module is parseable.
 */
const validateModulePath = (module) => {
  const parts = module.split(":");

  const invalid =
    parts.length !== 2 ||
    parts[0].split("/").length < 3 ||
    parts[1].length === 0;

  if (invalid) {
    throw new errors.InvalidModulePathError(
      `Entry path '${module}' does not follow the format 'users/username/repository:module'.`
    );
  }
};
