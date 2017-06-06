import * as types from './actionTypes';

export function setSessionName(sessionName) {
  return {
    type: types.SET_SESSION_NAME,
    sessionName
  };
}

export function setSessionCreated(isCreated) {
  return {
    type: types.SET_SESSION_CREATED,
    isCreated
  };
}
