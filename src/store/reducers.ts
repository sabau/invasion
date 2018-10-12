import {initialState} from 'src/constants';
import {ApplicationState} from 'src/types';
import {ALIEN, WORLD} from 'src/store/constants';
import {Action, handleActions} from 'redux-actions';
import {World} from 'components/World';
import {AlienMap} from 'components/Alien/Alien';

export const reducer = handleActions<ApplicationState, any>(
  {
    [WORLD.UPDATE]: (state: ApplicationState, {payload: world}: Action<World>) => ({
      ...state,
      ...(world && world)
    }),
    [ALIEN.MEET]: (state: ApplicationState, {payload: initPayload}: Action<ApplicationState>) =>
      ({
        ...state,
        ...(initPayload && initPayload)
      }),
    [ALIEN.MOVE]: (state: ApplicationState, {payload: aliens}: Action<AlienMap>) =>
      ({
        ...state,
        ...(aliens && aliens)
      })
  },
  initialState);
