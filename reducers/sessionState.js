import * as types from '../actions/actionTypes';

const initialState = {
  sessionName: "",
  sessionCreated: false
};

export default function sessionState(subState = initialState, action) {
  switch (action.type) {
    case types.SET_SESSION_NAME:
      return {
        ...subState,
        sessionName: action.sessionName
      };
    case types.SET_SESSION_CREATED:
      return {
        ...subState,
        sessionCreated: action.isCreated
      };
    default:
      return subState;
  }
}
