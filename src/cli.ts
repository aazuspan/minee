#! /usr/bin/env node

import chalk from 'chalk'
import tree from 'terminal-tree'
import { Command } from 'commander'
import * as errors from './errors.js'
import { bundleModule } from './bundle.js'
import { loadConfig, Config } from "./config.js"


new Command()
  .name('minee')
  .version('0.0.6')
  .description('📦 Earth Engine module bundler.')
  .option('-e, --entry <path>', 'The path to the module entry point, e.g. users/username/repository:module.')
  .option('-d --dest <path>', 'The local file path to write the bundled file.')
  .option('--no-minify', 'Skip minifying code after bundling.')
  .option('--no-header', 'Drop header information from the bundled file.')
  .option('--keep-names', 'Avoid changing internal variable names when minifying.')
  .action(async (options: Config) => {
    const config = { ...loadConfig(), ...options };
    await runBundler(config)
  })
  .showHelpAfterError()
  .parse(process.argv)

/**
 * Run bundling on an Earth Engine module, writing the results to a local file.
 * @param {string} entry - The path to the module entry point, e.g. users/username/repository:module.
 * @param {string} dest - The local file path to write the bundled module. If none is given, the file
 * will be written to ./<entry>.bundled.js.
 * @param {boolean} [noHeader=false] - If false, a header will be included in the bundled file
 * with information about the source and license for the bundled modules.
 */
async function runBundler ({entry, dest, minify, header, keepNames}: Config={}): Promise<void> {
  if (entry === undefined) {
    console.log(`
    ${chalk.red(
      'No entry point specified!'
    )} Please specify an entry point using the -e or --entry options, or by adding an 'entry' property to your .minee.json configuration file.
    `)
    return
  }

  try {
    const name = entry.split(':')[1].split('/').pop()
    dest = dest || `./${name}.bundled.js`
    console.log(`Bundling ${chalk.blue(entry)} to ${chalk.yellow(dest)}...\n`)
  }
  catch (err) {
    console.log(`
      ${chalk.red(
        'Invalid entry point!'
      )} '${entry}' does not match the required format 'users/username/repository:module'.
      `)
    return
  }

  try {
    const start = Date.now()
    const bundled = await bundleModule(entry, { header, minify, keepNames })
    const moduleTree = tree(bundled.entry.dependencyTree({ pretty: true }), {
      symbol: false,
      highlight: false,
      padding: 4
    }) as string
    const compressedPct = bundled.compressionPercent()
    bundled.write(dest, true)

    const fileSizeOperator = compressedPct > 0 ? '-' : '+'
    const fileSizeColor = compressedPct > 0 ? chalk.green.bold : chalk.red.bold
    const fileNumberOperator = bundled.modules.length > 1 ? '-' : ''
    const fileNumberColor =
      bundled.modules.length > 1 ? chalk.green.bold : chalk.white.bold

    console.log(`
Dependency Graph
----------------
${moduleTree}

File size: ${fileSizeColor(
      `${fileSizeOperator}${Math.abs(compressedPct).toFixed(1)}%`
    )}
Total imports: ${fileNumberColor(
      `${fileNumberOperator}${((1 - 1 / bundled.modules.length) * 100).toFixed(
        1
      )}%`
    )}
Time elapsed: ${chalk.green(((Date.now() - start) / 1000).toFixed(2) + "s")}
\n📦 Bundle saved to ${chalk.yellow.bold(dest)}
    `)
  } catch (err) {
    if (
      err instanceof errors.GitAuthenticationError ||
      err instanceof errors.InvalidCredentialsError ||
      err instanceof errors.MissingCredentialsError
    ) {
      console.log(`
      ${chalk.red(
        'Authentication failed!'
      )} Please go to the link below and follow the instructions to allow access to your Earth Engine repositories:

      ${chalk.blue('https://earthengine.googlesource.com/new-password')}
      `)
    } else if (err instanceof errors.RepositoryNotFoundError) {
      console.log(`
      ${chalk.red(
        'Module not found!'
      )} The module below could not be found. Please make sure the path is correct and that you have access to the repository.
      
      * ${chalk.bgRed(err.repository.path)}
      `)
    } else if (err instanceof errors.ModuleNotFoundError) {
      console.log(`
      ${chalk.red(
        'Script not found!'
      )} The script below could not be found within the repository. Please check that the script exists and the name is correct.
      
      * ${chalk.bgRed(err.path)}
      `)
    } else if (err instanceof errors.CircularDependencyError) {
      console.log(`
      ${chalk.red(
        'Circular dependency detected!'
      )} One or more modules require each other, creating a circular dependency. Please correct that issue and try again.
      `)
    } else {
      console.log(`
      ${chalk.red(
        'Unknown error!'
      )} An unknown error has occurred. Feel free to open a bug report at https://github.com/aazuspan/minee/issues.

      ${err as string}
      `)

      throw err
    }
  }
}
