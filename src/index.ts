import chalk from 'chalk';
import yargs from 'yargs';

function load(file: string) {
  console.log(chalk.blue(`Loading ${file}...`));
}

export function cli() {
  yargs
    .command(
      ['load', '<file>'],
      'load a markdown file into the database',
      args => {
        args
          .positional('file', {
            describe: 'The file to load',
            type: 'string',
          })
          .alias('f', 'file')
          .demandOption('file');
      },
      argv => {
        // This is fine because we demanded the option before
        load(argv.file as string);
      },
    )
    .help()
    .parse();
}
