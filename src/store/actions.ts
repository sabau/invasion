import {createAction} from 'redux-actions';
import {World} from 'components/World';
import {ALIEN, WORLD} from 'src/store/constants';
import {AlienMap} from 'components/Alien/Alien';


export const worldInitAction = createAction<InitPayload>(WORLD.INIT);
export const worldUpdateAction = createAction<{world: World}>(WORLD.UPDATE);
export const alienMeetAction = createAction<{aliens: AlienMap; world: World}>(ALIEN.MEET);
export const alienMoveAction = createAction<{aliens?: AlienMap}>(ALIEN.MOVE);

export type InitPayload = {
  path: string;
  aliens: number;
};
