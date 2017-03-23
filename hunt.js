import React, { Component } from 'react';
import { configureStore } from './store/store';
import { Provider } from 'react-redux';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import * as NavigationService from './utils/navigationService';
import SessionView from './views/sessionView';
import MapView from './views/mapView';
import Database from './modules/database'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class hunt extends Component {
  constructor (props) {
    super(props);
    this.state = { store: configureStore() };
    this.db = null;
  }

  componentWillMount = () => {
    this.db = new Database('session_gbg')
    setTimeout(() => {
      this.db.setCurrentPosition('first', 66412424126);
   }, 10000);
    setTimeout(() => {
      this.db.setCurrentPosition('second', 666);
   }, 15000);
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
}

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
