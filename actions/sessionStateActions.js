import * as types from './actionTypes';

export function setSessionName(sessionName) {
  return {
    type: types.SET_SESSION_NAME,
    sessionName
  };
}
