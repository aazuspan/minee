import fs from 'fs'
import path from 'path'
import os from 'os'
import * as errors from './errors.js'

/**
 * Retrieve locally stored Git credentials.
 *
 * Note, if the Google authentication flow is run multiple times, new credentials are concatenated to the end
 * of the file and old credentials are deactivated. This will always grab the most recent credentials.
 *
 * @param {string} [dir] The path to the directory containing .gitcookies. By default, the home directory is used.
 * @return {string} The credential password for Git access.
 */
export const loadGitCredentials = (dir: string = os.homedir()): string => {
  const cookiePath = path.join(dir, '.gitcookies')
  if (!fs.existsSync(cookiePath)) {
    throw new errors.MissingCredentialsError(
      `No credentials found at ${cookiePath}.`
    )
  }

  try {
    const lines = fs.readFileSync(cookiePath, 'utf8').split('\n')
    const credentials = lines.filter((line) => line.startsWith('earthengine.googlesource.com'))
    const lastCredential = credentials[credentials.length - 1]
    const password = lastCredential.split('=')[1]

    return password
  } catch (err) {
    if (err instanceof TypeError) {
      throw new errors.InvalidCredentialsError(
        'Credentials could not be parsed.'
      )
    }
    throw err
  }
}
