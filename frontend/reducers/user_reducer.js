import { RECEIVE_USER, REMOVE_CURRENT_USER, USER_ERROR } from '../actions/user_actions';
import merge from 'lodash/merge';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type) {
    case RECEIVE_USER:
      const newUser = {"current_user": action.user};
      return merge({}, state, newUser);
    case REMOVE_CURRENT_USER:
      const nextState = {};
      return nextState;
    case USER_ERROR:
      alert(action.error);
    default:
      return state;
  }
};

export default userReducer;
