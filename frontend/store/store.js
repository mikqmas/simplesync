import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer';
import thunkMiddleware from '../middleware/thunk';

const configureStore = (preloadedState = {}) => {
  const store = createStore(RootReducer, preloadedState, applyMiddleware(thunkMiddleware));
  store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState());
  });

  return store;
}

export default configureStore;
