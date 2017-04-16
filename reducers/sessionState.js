import * as types from '../actions/actionTypes';

const initialState = {
  sessionName: ""
};

export default function sessionState(subState = initialState, action) {
  switch (action.type) {
    case types.SET_SESSION_NAME:
      return {
        ...subState,
        sessionName: action.sessionName
      };
    default:
      return subState;
  }
}
