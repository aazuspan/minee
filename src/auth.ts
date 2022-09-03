import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as errors from './errors.js'

/**
 * Retrieve locally stored Git credentials.
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
    const data = fs.readFileSync(cookiePath, 'utf8')
    return data.split('=')[1].replace('\n', '')
  } catch (err) {
    if (err instanceof TypeError) {
      throw new errors.InvalidCredentialsError(
        'Credentials could not be parsed.'
      )
    }
    throw err
  }
}
