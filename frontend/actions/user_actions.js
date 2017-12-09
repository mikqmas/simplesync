import * as UserAPIUtil from '../util/user_api_util';
import { receiveErrors, clearErrors } from './error_actions';

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
})


//Async
export const createUser = user => dispatch => (
  UserAPIUtil.createUser(user)
  .then(user => {dispatch(receiveUser(user)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const deleteUser = user => dispatch => (
  UserAPIUtil.deleteUser(user)
  .then(user => {dispatch(receiveUser(user)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateUser = user => dispatch => (
  UserAPIUtil.updateUser(user)
  .then(user => {dispatch(receiveUser(user)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const login = user => dispatch => (
  UserAPIUtil.login(user)
  .then(user => {dispatch(receiveUser(user)); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);

export const logout = () => dispatch => (
  UserAPIUtil.logout()
  .then(() => {dispatch(removeCurrentUser()); dispatch(clearErrors())},
  err => dispatch(receiveErrors(err.responseJSON)))
);
