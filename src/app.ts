import {Logger} from './components/Logger';
import * as minimist from 'minimist';
import {stringifyWorld} from './components/World';
import {CommandLineArgs} from './types';
import {configureStore} from 'src/store/store';
import {alienMoveAction, worldInitAction} from 'src/store/actions';

const argv = minimist(process.argv.slice(2), {string: ['path', 'aliens']});

const store = configureStore();

/**
 * Generate the world, validates it and generate aliens on top of it. Once done they start
 * moving. This function return the string representing the final status of the world after the
 * simulation.
 *
 * @param {CommandLineArgs} argv
 * @returns {string}
 */
const run = async (argv: CommandLineArgs) => {
  const {path, aliens} = argv;
  store.dispatch(worldInitAction({path, aliens}));
  store.dispatch(alienMoveAction({}));
};

const getCommandLineArgs = (argv: minimist.ParsedArgs): CommandLineArgs =>
  ({path: argv.path || 'fixtures/world', aliens: argv.aliens || 5});

run(getCommandLineArgs(argv)).then(() => {
  Logger.info('This is what remains of our world:');
  Logger.info(`\n*************************\n${
    stringifyWorld(store.getState().world)
  }\n*************************\n`);
  process.exit(0);
}).catch((error: Error) => {
  console.error('exception with parameters: ', process.argv.slice(2), error);
  process.exit(-1);
});
