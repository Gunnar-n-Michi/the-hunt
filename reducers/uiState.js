import * as types from '../actions/actionTypes';

const initialState = {
  running: false
};

export default function uiState(subState = initialState, action) {
  switch (action.type) {
    case types.RUNNING:
      return {
        ...subState,
        running: action.running
      };
    default:
      return subState;
  }
}
