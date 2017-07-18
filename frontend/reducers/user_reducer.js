import { RECEIVE_USER, REMOVE_CURRENT_USER } from '../actions/user_actions';
import merge from 'lodash/merge';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type) {
    case RECEIVE_USER:
      const newUser = {[action.user.id]: action.user};
      return merge({}, state, newUser);
    case REMOVE_CURRENT_USER:
      const nextState = {};
      return nextState;
    default:
      return state;
  }
};

export default userReducer;
