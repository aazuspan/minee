/** Thrown when Earth Engine Git authentication fails. */
export class GitAuthenticationError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message);
    this.name = 'GitAuthenticationError';
  }
}

/** Thrown when an Earth Engine repository cannot be accessed through Earth Engine Git. */
export class RepositoryNotFoundError extends Error {
  /**
   * @param {string} message - The error message.
   * @param {Module} repository - The repository that could not be found.
   */
  constructor(message, repository) {
    super(message);
    this.name = 'RepositoryNotFoundError';
    this.repository = repository;
  }
}

/** Thrown when a script cannot be found within an Earth Engine module. */
export class ModuleNotFoundError extends Error {
  /**
   * @param {string} message - The error message.
   * @param {string} modulePath - The Earth Engine path to the module that could not be found.
   */
  constructor(message, modulePath) {
    super(message);
    this.name = 'ModuleNotFoundError';
    this.modulePath = modulePath;
  }
}

/** Thrown when a circular import dependency is found between two modules. */
export class CircularDependencyError extends Error {
  /**
   * @param {string} message - The error message.
   * @param {Script} moduleA - A module that requires moduleB.
   * @param {Script} moduleB - A module that requries moduleA.
   */
  constructor(message, moduleA, moduleB) {
    super(message);
    this.name = 'CircularDependencyError';
    this.moduleA = moduleA;
    this.moduleB = moduleB;
  }
}

/** Thrown when Git credentials cannot be parsed. */
export class InvalidCredentialsError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

/** Thrown when Git credentials cannot be found. */
export class MissingCredentialsError extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message);
    this.name = 'MissingCredentialsError';
  }
}

/** Thrown when a module path doesn't follow the valid format. */
export class InvalidModulePathError extends Error {
  /**
   * @param {string} message - The error message.
   * @param {string} modulePath - The invalid module path.
   */
  constructor(message, modulePath) {
    super(message);
    this.name = 'InvalidModulePathError';
    this.path = modulePath;
  }
}