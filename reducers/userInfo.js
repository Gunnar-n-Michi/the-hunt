import * as types from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  users: {}
};
export default function userInfo(subState = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...subState,
        currentUser: action.uid
      };
    case types.ADD_LOCATION_TO_USER:
      return {
        ...subState,
        users: {...subState.users, [action.uid] : {...subState.users[action.uid], ['location']: action.location }}
      };
    case types.ADD_NEW_USER:
      return {
        ...subState,
        users: {...subState.users, [action.uid] : { ['info']: action.info }}
        // users[action.uid]: {['info']action.info}
      };
    default:
      return subState;
  }
}
