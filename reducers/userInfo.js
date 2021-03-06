import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes';

const initialUserInfoState = {
};
// export default function userInfo(subState = initialUserInfoState , action) {
//   switch (action.type) {
//     case types.SET_CURRENT_USER_NAME:
//     case types.SET_CURRENT_USER_ID:
//       return {
//         ...subState,
//         currentUser: currentUserReducer(subState.currentUser, action)
//       };
//     case types.ADD_LOCATION_TO_USER:
//       // return {
//       //   ...subState,
//       //   users: {...subState.users, [action.uid] : {...subState.users[action.uid], ['location']: action.location }}
//       // };
//     case types.ADD_NEW_USER:
//       return {
//         ...subState,
//         // users: {...subState.users, [action.uid] : { ['info']: action.info }}
//         users: usersReducer(substate.users, action)
//         // users[action.uid]: {['info']action.info}
//       };
//     default:
//       return subState;
//   }
// }



const initialCurrentUserState = {
  uid: null,
  name: "Enter your player name",
  role: "hunter"
};

function currentUserReducer(subState = initialCurrentUserState, action){
  switch (action.type) {
    case types.SET_CURRENT_USER_ID:
      return {
        ...subState,
        uid: action.uid
      };
    case types.SET_CURRENT_USER_NAME:
      return {
        ...subState,
        name: action.name
      };
    case types.SET_CURRENT_USER_ROLE:
      return {
        ...subState,
        role: action.role
      };
    default:
      return subState;
  }
}

const initialUsersState = {
}

function usersReducer(subState = initialUsersState, action){
  switch (action.type) {
    case types.ADD_NEW_USER:
      return {
        ...subState,
        [action.uid] : { ['info']: action.info }
        // users[action.uid]: {['info']action.info}
      };
    case types.ADD_LOCATION_TO_USER:
      return {
        ...subState,
        [action.uid] : { ['location']: action.location }
      };
    case types.SET_USER_ROLE:
      return {
        ...subState,
        [action.uid] : { ['info']:  userInfoReducer(subState[action.uid].info, action.role) }
      };
    default:
      return subState;
  }
}

function userInfoReducer(subState = initialUsersState, action){
  switch (action.type) {
    case types.SET_USER_ROLE:
      return {
        ...subState,
        role : action.role
      };
    default:
      return subState;
  }
}

export default combineReducers({
  currentUser: currentUserReducer,
  users: usersReducer
})
