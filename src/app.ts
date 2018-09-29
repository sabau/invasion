import {Logger} from 'components/Logger';
import * as minimist from 'minimist';
import {initWorld, stringifyWorld, validateWorld} from 'components/World';
import {CommandLineArgs} from './types';

const argv = minimist(process.argv.slice(2), {string: ['path', 'aliens']});

if (!('path' in argv || 'aliens' in argv)) {
  Logger.info(`
  Usage:
  - npm run start -- --path=./my/map/file.txt aliens=10
  OR (defaulting to a random number of aliens)
  - npm run start -- --path=./my/map/file.txt`);
  process.exit(0);
}

const run = async (argv: CommandLineArgs) => {
  const world = initWorld(argv.path);
  if (!validateWorld(world)) throw new Error('World definition not consistent');
  return stringifyWorld(world);
};

const getCommandLineArgs = (argv: minimist.ParsedArgs): CommandLineArgs =>
  ({path: argv.path || '../components/World/fixtures/world', aliens: argv.aliens || 5});

run(getCommandLineArgs(argv)).then((result) => {
  Logger.info('This is what remains of our world:');
  Logger.info(result);
  process.exit(0);
}).catch((error: Error) => {
  console.error('Failed executing job for', process.argv.slice(2), error);
  process.exit(-1);
});
