import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image, Text } from 'react-native';
import Database from '../modules/database'


class SessionView extends React.Component {
  constructor(props) {
   super(props);
   this.state = { text: 'Name' };
   var initFirebase = new Database('session_gbg')
   setTimeout(function () {
     initFirebase.setCurrentPosition('first', 66412424126);
  }, 10000);
   setTimeout(function () {
     initFirebase.setCurrentPosition('second', 666);
  }, 15000);
 }

  render() {
    console.log (this.props)
    return (
      <View style={styles.container}>
        <Text>{this.props.appIsReady ? "True" : "False"}</Text>
        <Button onPress={this._handlePress.bind(this)} title="Click me"></Button>
      </View>
    );
  }

  _handlePress = () => {
    console.log ("A Press");
    const { navigate } = this.props.navigation;
    this.props.setAppState(this.props.appIsReady);
    navigate('MapView');
  }

  componentWillUnmount() {
    initFirebase.deleteUser();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => {
  return {
    appIsReady: state.appStates.appIsReady
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAppState: (isActive) => {
      var appState = null
      console.log ('OwnProps: ', ownProps);
      if (isActive){
        appState = 'STOP'
      } else {
        appState = 'START'
      }
      dispatch({type: appState})
    }
  }
}

const home = connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionView)


export default home
