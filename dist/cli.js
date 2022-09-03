#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from 'chalk';
import tree from 'terminal-tree';
import { Command } from 'commander';
import * as errors from './errors.js';
import { bundleModule } from './bundle.js';
new Command()
    .name('minee')
    .version('0.0.1')
    .description('📦 Earth Engine module bundler.')
    .arguments('<entry>')
    .option('-d --dest <path>', 'The local file path to write the bundled file.')
    .option('--no-header', 'Drop header information from the bundled file.')
    .action((entry, options) => __awaiter(void 0, void 0, void 0, function* () {
    yield runBundler(entry, options.dest, !options.header);
}))
    .parse(process.argv);
function runBundler(entry, dest, noHeader = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bundled = yield bundleModule(entry, dest, { noHeader });
            const moduleTree = tree(bundled.entry.dependencyTree({ pretty: false }), {
                symbol: false,
                highlight: false,
                padding: 4
            });
            const compressedPct = bundled.compressionPercent();
            const fileSizeOperator = compressedPct > 0 ? '-' : '+';
            const fileSizeColor = compressedPct > 0 ? chalk.green.bold : chalk.red.bold;
            const fileNumberOperator = bundled.modules.length > 1 ? '-' : '';
            const fileNumberColor = bundled.modules.length > 1 ? chalk.green.bold : chalk.white.bold;
            console.log(`
Dependency Graph
----------------
${moduleTree}

File size: ${fileSizeColor(`${fileSizeOperator}${Math.abs(compressedPct).toFixed(1)}%`)}
Total imports: ${fileNumberColor(`${fileNumberOperator}${((1 - 1 / bundled.modules.length) * 100).toFixed(1)}%`)}
📦 Bundle saved to ${chalk.yellow.bold(bundled.dest)}!
    `);
        }
        catch (err) {
            if (err instanceof errors.GitAuthenticationError ||
                err instanceof errors.InvalidCredentialsError ||
                err instanceof errors.MissingCredentialsError) {
                console.log(`
      ${chalk.red('Authentication failed!')} Please go to the link below and follow the instructions to allow access to your Earth Engine repositories:

      ${chalk.blue('https://earthengine.googlesource.com/new-password')}
      `);
            }
            else if (err instanceof errors.RepositoryNotFoundError) {
                console.log(`
      ${chalk.red('Module not found!')} The module below could not be found. Please make sure the path is correct and that you have access to the repository.
      
      * ${chalk.bgRed(err.repository.path)}
      `);
            }
            else if (err instanceof errors.ModuleNotFoundError) {
                console.log(`
      ${chalk.red('Script not found!')} The script below could not be found within the repository. Please check that the script exists and the name is correct.
      
      * ${chalk.bgRed(err.path)}
      `);
            }
            else if (err instanceof errors.CircularDependencyError) {
                console.log(`
      ${chalk.red('Circular dependency detected!')} One or more modules require each other, creating a circular dependency. Please correct that issue and try again.
      `);
            }
            else {
                console.log(`
      ${chalk.red('Unknown error!')} An unknown error has occurred. Feel free to open a bug report at https://github.com/aazuspan/minee/issues.

      ${err}
      `);
                throw err;
            }
        }
    });
}
