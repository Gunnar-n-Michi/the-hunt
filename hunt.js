import React, { Component } from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import * as NavigationService from './utils/navigationService';
import geo from './modules/geo';
// import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import StartView from './views/startView';
import WaitingLounge from './views/waitingLounge'
import SessionView from './views/sessionView';
import MapView from './views/mapView';
import { addLocationToUser, addNewUser } from './actions/userInfoActions';
import { setSessionName } from './actions/sessionStateActions';


import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// global database
global.db = null;
// global gameLogic
global.gL = null;

var currentUser;
export default class hunt extends Component {
  constructor (props) {
    super(props);
    this.store = store();
    this.state = {
      sessionCreated: false
    }
  }

  componentWillMount(){
    geo.initializeGeo(this.handleGeoLocation.bind(this));
    this.store.subscribe(this.stateChanged.bind(this))
    // let unsubscribe = this.store.subscribe(this._stateIsChanged)
  }

  componentDidMount () {
    NavigationService.setNavigator(this.navigator);
  }

  render = () => {
    return (
      <Provider store={this.store}>
        <AppNavigator ref={(nav) => { this.navigator = nav; }}/>
      </Provider>
    );
  }

  stateChanged() {
    console.log("state changed");
    this.state.sessionCreated = this.extractSessionCreated(this.store.getState());
    this.state.currentUser = this.store.getState().userInfo.currentUser.uid;
  }

  extractSessionCreated(state){
    return state.sessionState.sessionCreated
  }

  handleGeoLocation(location){
    if (global.db != null && this.state.sessionCreated){
      console.log("trying to add position to db");
      // global.db.setCurrentPosition(location)
      global.db.addCurrentPositionDB(this.state.currentUser, location);
    }
  }


}

//

const AppNavigator = StackNavigator (
  {
    StartView: {screen: StartView},
    MapView: { screen: MapView },
    WaitingLounge: {screen: WaitingLounge},
    SessionView: { screen: SessionView }
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

//
// const mapStateToProps = (state, ownProps) => {
//   // console.log("OwnProps: ", ownProps, this)
//   return {
//     state: state
//   }
// }
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     newLocationToUser: (uid, info) => {
//       dispatch(addLocationToUser(uid, info))
//     }
//   }
// }

// const hunt = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Hunt)
//
//
// export default hunt
