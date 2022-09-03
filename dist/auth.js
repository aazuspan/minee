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
        const data = fs.readFileSync(cookiePath, 'utf8');
        return data.split('=')[1].replace('\n', '');
    }
    catch (err) {
        if (err instanceof TypeError) {
            throw new errors.InvalidCredentialsError('Credentials could not be parsed.');
        }
        throw err;
    }
};
