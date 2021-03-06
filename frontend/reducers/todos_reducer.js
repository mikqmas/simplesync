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
      // TODO: Using window.store to find current user to know whether to delete todo or just remove user. Change so not rely on window store.
      nextState = merge({}, state);
      if(action.todo.users.map(user=>user.id).includes(window.store.getState().user.current_user.id)) {
        nextState[action.todo.id] = action.todo;
      } else {
        delete nextState[action.todo.id];
      }
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
