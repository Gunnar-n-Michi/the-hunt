import * as types from './actionTypes';

export function setCurrentUser(uid) {
  return {
    type: types.SET_CURRENT_USER,
    uid
  };
}
