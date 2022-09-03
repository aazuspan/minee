import { join } from 'path'
import { fs as memfs } from 'memfs'
import { traverse } from '@babel/core'
import { NodePath } from '@babel/traverse'
import { CallExpression } from '@babel/types'
import * as parser from '@babel/parser'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node/index.js'
import Spinner from '@slimio/async-cli-spinner'
import chalk from 'chalk'
import * as auth from './auth.js'
import * as errors from './errors.js'

type DependencyTree = string | { [k: string]: DependencyTree[] }

/** A Module represents a single Earth Engine source code file. */
class Module {
  path: string
  repository: Repository
  code: string
  stats: { size: number }
  commit: string
  ast: ReturnType<typeof parser.parse>
  license: string
  name: string
  dependencies: undefined | Module[]
  constructor (
    path: string,
    repository: Repository,
    code: string,
    stats: any,
    commit: any
  ) {
    this.path = path
    this.repository = repository
    this.code = code
    this.stats = stats
    this.commit = commit
    this.ast = parser.parse(code)
    this.license = this.parseLicense()
    this.name = path.split(':')[1].split('/').pop() as string
    this.dependencies = undefined
  }

  /**
   * Get a flat array of all modules required downstream.
   * @returns {Module[]} All modules required downstream.
   */
  listDependencies (): Module[] {
    if (this.dependencies === undefined) {
      throw new Error(
        'This module has unloaded dependencies. Try rebuilding the module with `loadDependencies=true`.'
      )
    }
    let downstream = [...this.dependencies]
    let queue = [...this.dependencies]
    while (queue.length > 0) {
      const current = queue.pop() as Module
      const loadedPaths = downstream.map((s) => s.path)
      const deps = current.dependencies as Module[]
      const next = deps.filter((s) => !loadedPaths.includes(s.path))

      queue = queue.concat(next)
      downstream = downstream.concat(next)
    }

    return downstream
  }

  /**
   * Recursively check for circular imports downstream of this module. Throw if any are found.
   *
   * @throws {CircularDependencyError} If any circular import is found between modules downstream of this module.
   */
  checkForCircularImports (): void {
    const scripts = this.listDependencies()

    for (const script of scripts) {
      const requiredPaths = script.parseDependencies()
      if (requiredPaths.includes(this.path)) {
        throw new errors.CircularDependencyError(
          `Circular dependency found between ${this.path} and ${script.path}!`,
          this,
          script
        )
      }

      script.checkForCircularImports()
    }
  }

  /**
   * Parse all downstream dependencies and load them.
   *
   * @param {string[]} [loaded] - An optional list of already loaded module paths. This is used internally to avoid
   * circular dependencies, and should not be passed by users.
   * @returns {Promise<Module[]>} A promise resolving to loaded modules required downstream of this script.
   */
  async loadDependencies (
    loaded: { [k: string]: Module } = {}
  ): Promise<Module[]> {
    loaded[this.path] = this

    const dependencyPaths = this.parseDependencies()

    const dependencies = await Promise.all(
      dependencyPaths
        .filter((p) => !(p in loaded))
        .map((p) => {
          if (p in loaded) {
            return loaded[p]
          }
          return loadModule(p, { loadDependencies: false })
        })
    )
    await Promise.all(dependencies.map(async (s) => await s.loadDependencies(loaded)))
    this.dependencies = dependencies

    return dependencies
  }

  /**
   * Build a dependency tree from all downstream modules.
   *
   * @returns {DependencyTree} The dependency tree of all modules required through this module/
   */
  dependencyTree (): DependencyTree {
    if (this.dependencies === undefined) {
      throw new Error(
        'This module has unloaded dependencies. Rebuild the module with `loadDependencies=true`.'
      )
    }

    const key = `${this.path} (#${this.commit})`
    if (this.dependencies.length === 0) return key
    const children = this.dependencies.map((s) => s.dependencyTree())
    return { [key]: children }
  }

  /**
   * Parse all module paths required by the root module code.
   * @return {string[]} The path of all modules required by the given code.
   */
  parseDependencies = (): string[] => {
    const reqs: string[] = []

    traverse(this.ast, {
      CallExpression (path: NodePath<CallExpression>) {
        const node = path.node
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'require'
        ) {
          const arg = node.arguments[0]
          if (arg.type === 'StringLiteral') {
            reqs.push(arg.value)
          }
        }
      }
    })

    return reqs
  }

  /**
   * Parse a license code block from the module AST. Currently,
   * this only supports blocks that include a `@license` tag.
   *
   * @return {string} The license code block.
   */
  parseLicense = (): string => {
    const comments = this.ast.comments
    if (comments === undefined || comments === null) {
      return ''
    }

    return comments
      .filter((c) => c.type === 'CommentBlock' && c.value.includes('@license'))
      .map((c) => c.value)
      .join('\n\n')
  }
}

/** A Repository contains one or more Earth Engine modules. */
class Repository {
  path: string
  name: string
  username: string
  url: string
  localPath: string
  /**
   * Create an Earth Engine repository from its root path.
   * @param {string} path - The path to the root of the Earth Engine repository, e.g. "users/username/repo".
   */
  constructor (path: string) {
    this.path = path
    this.name = path.split('/').pop() as string
    this.username = path.split('/')[1]
    this.url = `https://earthengine.googlesource.com/${path}`
    this.localPath = `/${this.name}`
  }

  /**
   * Git clone the module repository into memory.
   * @param {boolean} [showProgress=true] - If true, a spinner will display progress.
   * @return {Promise<string>} Promise object representing the cloned directory contents.
   */
  async clone (showProgress = true): Promise<string> {
    class DummySpinner {
      contructor (): void {}
      succeed (): void {}
      failed (): void {}
    }
    const prettyPath = chalk.blue.bold(this.path)
    const spinner = showProgress
      ? new Spinner({ color: 'cyan' }).start(`Cloning ${prettyPath}...`)
      : new DummySpinner()

    try {
      await git.clone({
        fs: memfs,
        http,
        dir: this.localPath,
        url: this.url,
        onAuth: () => ({ password: auth.loadGitCredentials() })
      })

      spinner.succeed(`Cloned ${prettyPath}!`)
    } catch (err) {
      spinner.failed(`Failed to clone ${prettyPath}!`)
      const gitHttpError = err instanceof git.Errors.HttpError

      if (gitHttpError && [400, 401].includes(err.data.statusCode)) {
        throw new errors.GitAuthenticationError(err.data.response)
      }
      if (gitHttpError && err.data.statusCode === 404) {
        throw new errors.RepositoryNotFoundError(err.data.response, this)
      }
      throw err
    }

    return this.localPath
  }
}

/**
 * Create and load an Earth Engine module from an entry path.
 *
 * @param {string} entry - The path to the entry Earth Engine module, e.g. "users/username/repository:module".
 * @param {object} [options]
 * @param {boolean} [options.showProgress=true] - If true, progress spinners will be when when cloning repositories.
 * @param {boolean} [options.loadDependencies=true] - If true, all downstream modules will be loaded and stored in
 * the `dependencies` property of the loaded module.
 * @param {boolean} [options.allowCircular=false] - If true, circular import errors will be ignored when loading
 * dependencies.
 * @returns {Promise<Module>} A promise that resolves to a loaded module.
 */
async function loadModule (
  entry: string,
  { showProgress = true, loadDependencies = true, allowCircular = false } = {}
): Promise<Module> {
  validateModulePath(entry)

  const relPath = entry.split(':')[1]
  const repository = new Repository(entry.split(':')[0])
  const localPath = join(repository.localPath, relPath)

  if (!memfs.existsSync(repository.localPath)) {
    await repository.clone(showProgress)
  }
  if (!memfs.existsSync(localPath)) {
    throw new errors.ModuleNotFoundError(`Module ${entry} not found!`, entry)
  }
  const code = memfs.readFileSync(localPath, 'utf8') as string
  const stats = memfs.statSync(localPath, { throwIfNoEntry: true })

  let commit
  try {
    const commits = await git.log({
      fs: memfs,
      dir: repository.localPath,
      filepath: relPath,
      depth: 1,
      ref: 'master'
    })
    // Grab the short hash
    commit = commits[0].oid.slice(0, 7)
  } catch (err) {
    commit = 'Unknown'
  }

  const module = new Module(entry, repository, code, stats, commit)

  if (loadDependencies) {
    await module.loadDependencies()
    if (!allowCircular) {
      await module.checkForCircularImports()
    }
  }

  return module
}

/**
 * Check if an Earth Engine module path follows a valid format.
 *
 * This isn't an exhaustive check against Earth Engine filename requirements, but does
 * ensure that the path is at least parseable and contains the correct pieces.
 *
 * @param {string} modulePath - The path to an Earth Engine module, e.g. users/username/repository:module.
 * @returns {boolean} True if the module is parseable.
 */
const validateModulePath = (modulePath: string): void => {
  const parts = modulePath.split(':')

  const invalid =
    parts.length !== 2 ||
    parts[0].split('/').length < 3 ||
    parts[1].length === 0

  if (invalid) {
    throw new errors.InvalidModulePathError(
      `Entry path '${modulePath}' does not follow the format 'users/username/repository:module'.`,
      modulePath
    )
  }
}

export type { Module, Repository, DependencyTree }
export { loadModule }
