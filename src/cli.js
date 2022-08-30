#! /usr/bin/env node

import chalk from "chalk";
import tree from "terminal-tree";
import { Command } from "commander";
import * as errors from "./errors.js";
import { bundleModule } from "minee";

new Command()
  .name("minee")
  .version("0.0.1")
  .description("📦 Earth Engine module bundler.")
  .arguments(
    "<entry>",
    "The path to the module entry point, e.g. users/username/repository:module"
  )
  .option(
    "-d, --dest <path>",
    "The local file path to write the bundled module."
  )
  .action((entry, options) => {
    runBundler(entry, options.dest);
  })
  .parse(process.argv);

/**
 * Run bundling on an Earth Engine module, writing the results to a local file.
 * @param {string} entry - The path to the module entry point, e.g. users/username/repository:module.
 * @param {string} dest - The local file path to write the bundled module.
 */
async function runBundler(entry, dest) {
  try {
    const bundled = await bundleModule(entry, dest);
    const compressed = bundled.compressionPercent();

    const fileSizeOperator = compressed > 0 ? "-" : "+";
    const fileSizeColor = compressed > 0 ? chalk.green.bold : chalk.red.bold;
    const fileNumberOperator = bundled.modules.length > 1 ? "-" : "";
    const fileNumberColor =
      bundled.modules.length > 1 ? chalk.green.bold : chalk.white.bold;

    console.log(`
Dependency Graph
----------------
${tree(bundled.entry.dependencyTree(), {
  symbol: false,
  highlight: false,
  padding: 4,
})}

File size: ${fileSizeColor(
  `${fileSizeOperator}${Math.abs(compressed).toFixed(1)}%`
)}
Total imports: ${fileNumberColor(
  `${fileNumberOperator}${((1 - 1 / bundled.modules.length) * 100).toFixed(
    1
  )}%`
)}
📦 Bundle saved to ${chalk.yellow.bold(bundled.dest)}!
    `);
  } catch (err) {
    if (
      err instanceof errors.GitAuthenticationError ||
      err instanceof errors.InvalidCredentialsError ||
      err instanceof errors.MissingCredentialsError
    ) {
      console.log(`
      ${chalk.red(
        "Authentication failed!"
      )} Please go to the link below and follow the instructions to allow access to your Earth Engine repositories:

      ${chalk.blue("https://earthengine.googlesource.com/new-password")}
      `);
    } else if (err instanceof errors.RepositoryNotFoundError) {
      console.log(`
      ${chalk.red(
        "Module not found!"
      )} The module below could not be found. Please make sure the path is correct and that you have access to the repository.
      
      * ${chalk.bgRed(err.module.path)}
      `);
    } else if (err instanceof errors.ModuleNotFoundError) {
      console.log(`
      ${chalk.red(
        "Script not found!"
      )} The script below could not be found within the repository. Please check that the script exists and the name is correct.
      
      * ${chalk.bgRed(err.scriptPath)}
      `);
    } else if (err instanceof errors.CircularDependencyError) {
      console.log(`
      ${chalk.red(
        "Circular dependency detected!"
      )} One or more modules require each other, creating a circular dependency. Please correct that issue and try again.
      `);
    } else {
      console.log(`
      ${chalk.red(
        "Unknown error!"
      )} An unknown error has occurred. Feel free to open a bug report at https://github.com/aazuspan/minee/issues.

      ${err}
      `);

      throw err;
    }
  }
}
