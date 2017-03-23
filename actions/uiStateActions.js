import * as types from './actionTypes';

export function setRunning(running) {
  return {
    type: types.RUNNING,
    running
  };
}
