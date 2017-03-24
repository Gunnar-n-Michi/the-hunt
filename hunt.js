import React, { Component } from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import * as NavigationService from './utils/navigationService';
// import geo from './modules/geo';
// import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import StartView from './views/startView';
import WaitingLounge from './views/waitingLounge'
import SessionView from './views/sessionView';
import MapView from './views/mapView';
import Database from './modules/database';
import { addLocationToUser, addNewUser } from './actions/userInfoActions';
import { setSessionName } from './actions/sessionStateActions';


import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

global.db = null;

var currentUser;
export default class hunt extends Component {
  constructor (props) {
    super(props);
    this.store = store();
  }

  componentWillMount(){
    // geo.initializeGeo(this._handleGeoLocation);
    // let unsubscribe = this.store.subscribe(this._stateIsChanged)
    // global.db = new Database('session_gbg', this.store);
    // global.db.suscribeToNewUserAdded((data) => {
    //   let currentUser = data.key
    //   this.store.dispatch(addNewUser(currentUser, data.val()));
    //   global.db.suscribeToUserPosition(currentUser, this._userPosition);
    // });
  }

  componentDidMount () {
    NavigationService.setNavigator(this.navigator);
  }

  render = () => {
    return (
      <Provider store={this.store} db={this.db}>
        <AppNavigator ref={(nav) => { this.navigator = nav; }}/>
      </Provider>
    );
  }

  // _stateIsChanged = () => {
  //   let state = this.store.getState();
  //   let oldUser = currentUser
  //    currentUser = state.userInfo.currentUser;
  //    if (oldUser !== currentUser) {
  //      global.db.suscribeToUserPosition(currentUser, this._userPosition);
  //    }
  // }

  _handleGeoLocation(location){
    // global.db.setCurrentPosition(location)
  }

  _userPosition = (data) => {
    console.log("User position data: ", data.key, data.val());
    let state = this.store.getState();
    let info =  data.val()
    this.store.dispatch(addLocationToUser(state.userInfo.currentUser, info))
    console.log("TEETETETETE",  this);
    // coordinate = { latitude: info.latitude, longitude: info.longitude }
  }
}

//

const AppNavigator = StackNavigator (
  {
    StartView: {screen: StartView},
    WaitingLounge: {screen: WaitingLounge},
    SessionView: { screen: SessionView },
    MapView: { screen: MapView },
  },
  {
    navigationOptions: {
      title: 'Home Screen',
      header: {
        visible: false
      }
    }
  }
)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
