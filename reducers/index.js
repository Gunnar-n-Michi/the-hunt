import uiState from './uiState';
import userInfo from './userInfo';
import { combineReducers } from 'redux';

const rootReducer = combineReducers( {
  uiState,
  userInfo
});

export default rootReducer;
