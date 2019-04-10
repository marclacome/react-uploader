import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './reducers/root_reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const StoreMaker = () => createStore(
  createRootReducer(),
  {},
  composeEnhancers(
    applyMiddleware(
      thunk,
    ),
  ),
);


export const Store = StoreMaker();
