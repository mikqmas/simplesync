import {combineReducers} from 'redux';
import todosReducer from './todos_reducer';
import userReducer from './user_reducer';
import errorsReducer from './error_reducer';

const RootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
  errors: errorsReducer
});

export default RootReducer;
