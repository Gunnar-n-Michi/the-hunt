import * as types from '../actions/actionTypes';

const initialState = {
  appIsReady: true
};

export default function appStates(state = initialState, action = {}) {
  switch (action.type) {
    case types.START:
      return {
        ...state,
        appIsReady: true
      };
    case types.STOP:
      return {
        ...state,
        appIsReady: false
      };
    default:
      return state;
  }
}
