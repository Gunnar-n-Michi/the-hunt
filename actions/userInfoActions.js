import * as types from './actionTypes';

export function setCurrentUser(uid) {
  return {
    type: types.SET_CURRENT_USER,
    uid
  };
}

export function addLocationToUser(uid, location) {
  return {
    type: types.ADD_LOCATION_TO_USER,
    location,
    uid
  };
}

export function addNewUser(uid, info) {
  return {
    type: types.ADD_NEW_USER,
    uid,
    info
  };
}
