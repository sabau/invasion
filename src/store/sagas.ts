import {select, takeEvery, takeLatest, put} from 'redux-saga/effects';
import {ALIEN, WORLD} from 'src/store/constants';
import {initWorld, validateWorld} from 'components/World';
import {alienMeetAction, alienMoveAction, InitPayload, worldUpdateAction} from 'src/store/actions';
import {alienMeetings, generateAliens, moveAliens} from 'components/Alien';
import {Error} from 'tslint/lib/error';
import {Action} from 'redux-actions';

/**
 * Function to demonstrate logging on console.log using sagas
 * @param action
 */

function* logger(action: any) {
  const state = yield select();
  console.log('Action:', action);
  console.log('State After:', state);
}

/**
 * Initialize the world with a certain number of aliens and a path of a file that describe a city
 */
function* initWorldSaga({payload}: Action<InitPayload>) {
  if (!payload) return;
  const {path, aliens} = payload;
  const world = initWorld(path);
  if (!validateWorld(world)) throw new Error('World definition not consistent');
  yield put(worldUpdateAction({world}));

  const generatedAliens = generateAliens(world, aliens);
  // move aliens from the void to the world
  yield put(alienMoveAction({aliens: generatedAliens}));
}

/**
 * Execute the rounds until we have either cities, aliens or rounds available.
 * It define the final world state
 */
function* moveAliensSaga() {
  let steps = 0;
  let state;
  do {
    yield meetAndMoveAlienSaga();
    state = yield select();
  } while (steps++ < 10000 && state.aliens.length > 0);
}

/**
 * From the current situation let the aliens meet and destroy, then move the remaining ones along
 * the remaining pieces of the world
 */
function* meetAndMoveAlienSaga() {
  const {aliens, world} = yield select();
  const {world: newWorld, aliens: newAliens} = alienMeetings(aliens, world);
  const movedAliens = yield moveAliens(newAliens, newWorld);

  yield put(alienMeetAction({aliens: movedAliens, world: newWorld}));
}

export default function* rootSaga() {
  yield takeEvery('*', logger);
  yield takeLatest(WORLD.INIT, initWorldSaga);
  yield takeLatest(ALIEN.MOVE, moveAliensSaga);

}
