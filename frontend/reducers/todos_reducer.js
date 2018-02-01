import { RECEIVE_TODOS,
         RECEIVE_TODO,
         REMOVE_FROM_TODO,
         REMOVE_TODO } from '../actions/todo_actions';
import {RECEIVE_ERRORS} from '../actions/error_actions';
import merge from 'lodash/merge';

const todosReducer = (state = {}, action) => {
  // delete state['errors'];
  Object.freeze(state);
  let nextState;

  switch(action.type){
    case RECEIVE_TODOS:
      nextState = {};
      action.todos.forEach(todo => nextState[todo.id] = todo);
      return nextState;
    case RECEIVE_TODO:
      const newTodo = {[action.todo.id]: action.todo};
      nextState = merge({}, state, newTodo);
      return nextState;
    case REMOVE_FROM_TODO:
      nextState = merge({}, state);
      nextState[action.todo.id] = action.todo;
      return nextState;
    case REMOVE_TODO:
      nextState = merge({}, state);
      delete nextState[action.todo.id];
      return nextState;
    case RECEIVE_ERRORS:
      nextState = merge({}, state);
      // nextState["errors"] = action.errors.responseJSON;
      return nextState;
    default:
      return state;
  }
};

export default todosReducer;
