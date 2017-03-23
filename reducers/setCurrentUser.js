import * as types from '../actions/actionTypes';

const initialState = {
  currentUser: null
};
export default function setCurrentUser(state = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.uid
      };
    default:
      return state;
  }
}
