import React, { Component } from 'react';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import * as NavigationService from './NavigationService';
import SessionView from './SessionView';

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
  }

  componentDidMount () {
    NavigationService.setNavigator(this.navigator);
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <AppNavigator ref={(nav) => { this.navigator = nav; }}/>
      </Provider>
    );
  }
}

const AppNavigator = StackNavigator (
  {
  SessionView: { screen: SessionView },
  },
  {
    navigationOptions: {
      header: {
        visible: true
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
