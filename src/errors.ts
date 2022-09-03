import { Module, Repository } from './module.js'

/** Thrown when Earth Engine Git authentication fails. */
export class GitAuthenticationError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor (message: string) {
    super(message)
    this.name = 'GitAuthenticationError'
  }
}

/** Thrown when an Earth Engine repository cannot be accessed through Earth Engine Git. */
export class RepositoryNotFoundError extends Error {
  repository: Repository
  /**
   * @param {string} message - The error message.
   * @param {Repository} repository - The repository that could not be found.
   */
  constructor (message: string, repository: Repository) {
    super(message)
    this.name = 'RepositoryNotFoundError'
    this.repository = repository
  }
}

/** Thrown when a script cannot be found within an Earth Engine module. */
export class ModuleNotFoundError extends Error {
  path: string
  /**
   * @param {string} message - The error message.
   * @param {string} path - The Earth Engine path to the module that could not be found.
   */
  constructor (message: string, path: string) {
    super(message)
    this.name = 'ModuleNotFoundError'
    this.path = path
  }
}

/** Thrown when a circular import dependency is found between two modules. */
export class CircularDependencyError extends Error {
  moduleA: Module
  moduleB: Module
  /**
   * @param {string} message - The error message.
   * @param {Module} moduleA - A module that requires moduleB.
   * @param {Module} moduleB - A module that requries moduleA.
   */
  constructor (message: string, moduleA: Module, moduleB: Module) {
    super(message)
    this.name = 'CircularDependencyError'
    this.moduleA = moduleA
    this.moduleB = moduleB
  }
}

/** Thrown when Git credentials cannot be parsed. */
export class InvalidCredentialsError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor (message: string) {
    super(message)
    this.name = 'InvalidCredentialsError'
  }
}

/** Thrown when Git credentials cannot be found. */
export class MissingCredentialsError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor (message: string) {
    super(message)
    this.name = 'MissingCredentialsError'
  }
}

/** Thrown when a module path doesn't follow the valid format. */
export class InvalidModulePathError extends Error {
  path: string
  /**
   * @param {string} message - The error message.
   * @param {string} path - The invalid module path.
   */
  constructor (message: string, path: string) {
    super(message)
    this.name = 'InvalidModulePathError'
    this.path = path
  }
}
