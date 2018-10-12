import {should, use} from 'chai';
import {initialState} from 'src/constants';
import {alienMeetAction, alienMoveAction, worldUpdateAction} from 'src/store/actions';
import {reducer} from 'src/store/reducers';

use(should);

describe('Global reducer', () => {
  const state = initialState;
  const world = {Foo: 'Bar', Bar: 'Foo'};
  const aliens = {Foo: [{name: 1, city: 'Foo'}]};

  it('should update the world', () => {
    const action = worldUpdateAction({world});
    reducer(state, action).should.be.eql({...state, world});
  });
  it('should move some aliens the world', () => {
    const action = alienMoveAction({aliens});
    reducer(state, action).should.be.eql({...state, aliens});
  });
  it('should kill the world', () => {
    const action = alienMeetAction(initialState);
    reducer({world, aliens}, action).should.be.eql(initialState);
  });
});
