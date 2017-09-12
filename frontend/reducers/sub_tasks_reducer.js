import { RECEIVE_SUBTASKS,
         RECEIVE_SUBTASK,
         REMOVE_SUBTASK,
         SUBTASK_ERROR } from '../actions/sub_task_actions';
import merge from 'lodash/merge';

const subTasksReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type){
    case RECEIVE_SUBTASKS:
      nextState = {};
      action.subTasks.forEach(subTask => nextState[subTask.id] = subTask);
      return nextState;
    case RECEIVE_SUBTASK:
      const newTodo = {[action.subTask.id]: action.subTask};
      return merge({}, state, newTodo);
    case REMOVE_SUBTASK:
      nextState = merge({}, state);
      delete nextState[action.subTask.id];
      return nextState;
    case SUBTASK_ERROR:
      alert(action.error);
    default:
      return state;
  }
};

export default subTasksReducer;
