import fs from 'fs';
import path from 'path';
import os from 'os';
import * as errors from './errors.js';
export const loadGitCredentials = (dir = os.homedir()) => {
    const cookiePath = path.join(dir, '.gitcookies');
    if (!fs.existsSync(cookiePath)) {
        throw new errors.MissingCredentialsError(`No credentials found at ${cookiePath}.`);
    }
    try {
        const lines = fs.readFileSync(cookiePath, 'utf8').split('\n');
        const credentials = lines.filter((line) => line.includes('.googlesource.com'));
        const lastCredential = credentials[credentials.length - 1];
        const password = lastCredential.split('=')[1].trim();
        return password;
    }
    catch (err) {
        if (err instanceof TypeError) {
            throw new errors.InvalidCredentialsError('Credentials could not be parsed.');
        }
        throw err;
    }
};
