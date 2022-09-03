export class GitAuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'GitAuthenticationError';
    }
}
export class RepositoryNotFoundError extends Error {
    constructor(message, repository) {
        super(message);
        this.name = 'RepositoryNotFoundError';
        this.repository = repository;
    }
}
export class ModuleNotFoundError extends Error {
    constructor(message, path) {
        super(message);
        this.name = 'ModuleNotFoundError';
        this.path = path;
    }
}
export class CircularDependencyError extends Error {
    constructor(message, moduleA, moduleB) {
        super(message);
        this.name = 'CircularDependencyError';
        this.moduleA = moduleA;
        this.moduleB = moduleB;
    }
}
export class InvalidCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCredentialsError';
    }
}
export class MissingCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MissingCredentialsError';
    }
}
export class InvalidModulePathError extends Error {
    constructor(message, path) {
        super(message);
        this.name = 'InvalidModulePathError';
        this.path = path;
    }
}
