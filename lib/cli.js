#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const index_1 = require("./index");
if (require.main === module) {
    yargs(process.argv.slice(2))
        .usage('Usage: hanzo [options] file.css file.scss ...')
        .env('HANZO')
        .config()
        .options({
        'verbose': {
            alias: 'V',
            type: 'boolean',
            default: false,
            describe: 'Print warnings to console'
        },
        'minify': {
            alias: 'M',
            type: 'boolean',
            default: false,
            describe: 'Minify the generated bundle'
        },
        'sourcemaps': {
            alias: 'S',
            type: 'boolean',
            default: false,
            describe: 'Generate source maps'
        },
        'outfile': {
            alias: 'O',
            normalize: true,
            type: 'string',
            demandOption: true,
            describe: 'The bundle output file'
        },
        'includepaths': {
            alias: 'I',
            normalize: true,
            type: 'array',
            default: ['.'],
            describe: 'Include paths for .scss/.sass files'
        }
    })
        .help();
    const argv = yargs.argv;
    if (argv._.length === 0) {
        yargs.showHelp();
    }
    else {
        const start = new Date().getTime();
        index_1.default(argv._, argv.outfile, {
            sourceMaps: !!argv.sourcemaps,
            minify: !!argv.minify,
            verbose: !!argv.verbose,
            includePaths: argv.includepaths
        })
            .then(() => new Date().getTime() - start)
            .then(elapsed => {
            if (argv.verbose) {
                console.log('Hanzo complete!', (elapsed / 1000).toFixed(2), 'seconds');
            }
        })
            .catch(error => console.error(error));
    }
}
else {
    throw new Error('hanzo is only meant to be run at the command line');
}
