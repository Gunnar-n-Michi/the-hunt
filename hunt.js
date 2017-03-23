import React, { Component } from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import * as NavigationService from './utils/navigationService';
import SessionView from './views/sessionView';
import geo from './modules/geo'
// import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
// import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import MapView from './views/mapView';
import Database from './modules/database'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

global.db = null;


export default class hunt extends Component {
  constructor (props) {
    super(props);
    this.state = { store: store() };
  }

  componentWillMount(){
    geo.initializeGeo(this._handleGeoLocation);
    global.db = new Database('session_gbg', this.state)
    console.log ("DB: ", global.db);
    // global.db.suscribeToUserPosition(global.db.getUserId(), this._userPosition);
  }

  componentDidMount () {
    NavigationService.setNavigator(this.navigator);
  }

  render = () => {
    return (
      <Provider store={this.state.store} db={this.db}>
        <AppNavigator ref={(nav) => { this.navigator = nav; }}/>
      </Provider>
    );
  }

  _handleGeoLocation(location){
    // global.db.setCurrentPosition(location)
  }

  _userPosition(data){
    console.log("User position data: ", data);
  }
}

//

const AppNavigator = StackNavigator (
  {
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
