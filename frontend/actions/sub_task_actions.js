import * as SubTaskAPIUtil from '../util/sub_task_api_util';
import { receiveErrors, clearErrors } from './error_actions';

export const RECEIVE_SUBTASKS = "RECEIVE_SUBTASKS";
export const RECEIVE_SUBTASK = "RECEIVE_SUBTASK";
export const REMOVE_SUBTASK = "REMOVE_SUBTASK";
export const UPDATE_SUBTASK = "UPDATE_SUBTASK";

export const receiveSubTasks = subTasks => ({
  type: RECEIVE_SUBTASKS,
  subTasks
});

export const receiveSubTask = subTask => ({
  type: RECEIVE_SUBTASK,
  subTask
});

export const removeSubTask = subTask =>  ({
  type: REMOVE_SUBTASK,
  subTask
});

//async actions
export const fetchSubTasks = todoId => dispatch => (
  SubTaskAPIUtil.fetchSubTasks(todoId).then(subTasks => dispatch(receiveSubTasks(subTasks)))
);

export const createSubTask = subTask => dispatch => (
  SubTaskAPIUtil.createSubTask(subTask)
  .then(subTask => { dispatch(receiveSubTask(subTask)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateSubTask = subTask => dispatch => (
  SubTaskAPIUtil.updateSubTask(subTask).then(subTask => {dispatch(receiveSubTask(subTask)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const deleteSubTask = subTask => dispatch => (
  SubTaskAPIUtil.deleteSubTask(subTask).then(subTask => {dispatch(removeSubTask(subTask)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err)))
);
