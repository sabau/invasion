import {Store, createStore, applyMiddleware} from 'redux';
import {ApplicationState} from 'src/types';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'src/store/sagas';
import {Action} from 'redux-actions';
import {initialState} from 'src/constants';
import {reducer} from 'src/store/reducers';


export const configureStore = (): Store<ApplicationState> => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore<ApplicationState, Action<Partial<ApplicationState>>, any, {}>(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);
  return store;
};
