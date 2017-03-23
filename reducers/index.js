import appStates from './appStates';
import setCurrentUser from './setCurrentUser';
import { combineReducers } from 'redux';

const rootReducer = combineReducers( {
  appStates: appStates,
  setCurrentUser: setCurrentUser
});

export default rootReducer;
