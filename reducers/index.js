import uiState from './uiState';
import userInfo from './userInfo';
import sessionState from './sessionState'
import { combineReducers } from 'redux';

const rootReducer = combineReducers( {
  uiState,
  userInfo,
  sessionState
});

export default rootReducer;
