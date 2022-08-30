import fs from "fs";
import path from "path";
import os from "os";
import * as errors from "./errors.js";

/**
 * Retrieve locally stored Git credentials.
 * @param {string} [cookieDir] The path to the directory containing .gitcookies. By default, the home directory is used.
 * @return {string} The credential password for Git access.
 */
export const loadGitCredentials = (cookieDir = os.homedir()) => {
  const cookiePath = path.join(cookieDir, ".gitcookies");
  try {
    const data = fs.readFileSync(cookiePath, "utf8");
    return data.split("=")[1].replace("\n", "");
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new errors.MissingCredentialsError(
        `No credentials found at ${cookiePath}.`
      );
    } else if (err instanceof TypeError) {
      throw new errors.InvalidCredentialsError(
        "Credentials could not be parsed."
      );
    }
    throw err;
  }
};
