import {Logger} from 'components/Logger';
import * as minimist from 'minimist';
import {initWorld, stringifyWorld, validateWorld, World} from 'components/World';
import {CommandLineArgs} from './types';
import {Alien, alienMeetings, generateAliens, moveAliens} from 'components/Alien/Alien';
import {Dict} from 'dict';

const argv = minimist(process.argv.slice(2), {string: ['path', 'aliens']});

if (!('path' in argv || 'aliens' in argv)) {
  Logger.info(`
  Usage:
  - npm run start -- --path=./my/map/file.txt aliens=10
  OR (defaulting to a random number of aliens)
  - npm run start -- --path=./my/map/file.txt`);
  process.exit(0);
}

export type Status = {
  world: World;
  aliens: Dict<Alien[]>;
};

const iterate = (initialWorld: World, initialAliens: Dict<Alien[]>) => {
  let round = 0;
  let world = initialWorld;
  let aliens = initialAliens;
  do {
    const {world: newWorld, aliens: newAliens} = alienMeetings(aliens, world);
    world = newWorld;
    aliens = moveAliens(newAliens, newWorld);
    round++;
  } while (round < 1000 && Object.keys(aliens).length > 0);
  return world;
};

const run = async (argv: CommandLineArgs) => {
  const world = initWorld(argv.path);
  if (!validateWorld(world)) throw new Error('World definition not consistent');
  const aliens = generateAliens(world, argv.aliens);
  return stringifyWorld(iterate(world, aliens));
};

const getCommandLineArgs = (argv: minimist.ParsedArgs): CommandLineArgs =>
  ({path: argv.path || '../components/World/fixtures/world', aliens: argv.aliens || 5});

run(getCommandLineArgs(argv)).then((result) => {
  Logger.info('This is what remains of our world:');
  Logger.info(`\n*************************\n${result}\n*************************\n`);
  process.exit(0);
}).catch((error: Error) => {
  console.error('Failed executing job for', process.argv.slice(2), error);
  process.exit(-1);
});
