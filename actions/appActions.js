import * as types from './actionTypes';

export function start() {
  return {
    type: types.START
    console.log ( 'Start' )
  };
}

export function stop() {
  return {
    type: types.STOP
    console.log ( 'Stop' )
  };
}
