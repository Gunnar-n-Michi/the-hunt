import appStates from './appStates';
import { combineReducers } from 'redux';

const rootReducer = combineReducers( {
  appStates: appStates
});

export default rootReducer;
