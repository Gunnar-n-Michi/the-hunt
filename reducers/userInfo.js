import * as types from '../actions/actionTypes';

const initialState = {
  currentUser: null
};
export default function userInfo(subState = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...subState,
        currentUser: action.uid
      };
    default:
      return subState;
  }
}
