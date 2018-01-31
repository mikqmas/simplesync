import * as TodoAPIUtil from '../util/todo_api_util';
import * as UserTodoAPIUtil from '../util/user_todo_api_util';
import { receiveErrors, clearErrors } from './error_actions';

export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const RECEIVE_TODO = "RECEIVE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const REMOVE_FROM_TODO = "REMOVE_FROM_TODO";
// export const ERROR_TODO = "ERROR_TODO";

// export const RECEIVE_USER_TODO = "RECEIVE_USER_TODO";
// export const receiveUserTodo = userTodo => ({
//   type: RECEIVE_USER_TODO,
//   userTodo
// });


export const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos
});

export const receiveTodo = todo => ({
  type: RECEIVE_TODO,
  todo
});

export const removeFromTodo = todo => ({
  type: REMOVE_FROM_TODO,
  todo
});

export const removeTodo = todo =>  ({
  type: REMOVE_TODO,
  todo
});

// export const errorTodo = todo =>  ({
//   type: ERROR_TODO,
//   todo
// });

//async actions
export const fetchTodos = () => dispatch => (
  TodoAPIUtil.fetchTodos().then(todos => dispatch(receiveTodos(todos)))
);

export const getTodo = todoId => dispatch => (
  TodoAPIUtil.getTodo(todoId)
  .then(todo => { dispatch(receiveTodo(todo)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const createTodo = todo => dispatch => (
  TodoAPIUtil.createTodo(todo)
  .then(todo => { dispatch(receiveTodo(todo)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateTodo = todo => dispatch => (
  TodoAPIUtil.updateTodo(todo).then(todo => {dispatch(receiveTodo(todo)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const deleteTodo = todo => dispatch => (
  TodoAPIUtil.deleteTodo(todo).then(todo => {dispatch(removeTodo(todo)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err)))
);

export const createUserTodo = userTodo => dispatch => (
  UserTodoAPIUtil.createUserTodo(userTodo)
  .then(todo => { dispatch(receiveTodo(todo)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const deleteUserTodo = userTodo => dispatch => {
  return (UserTodoAPIUtil.deleteUserTodo(userTodo)
  .then(todo => { dispatch(removeTodo(todo)); dispatch(clearErrors());},
  err => dispatch(receiveErrors(err))))
};

export const deleteUserTodoAsOwner = userTodo => dispatch => {
  return (UserTodoAPIUtil.deleteUserTodo(userTodo)
  .then(todo => { dispatch(removeFromTodo(todo)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err))))
};
