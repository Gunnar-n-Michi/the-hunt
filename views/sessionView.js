import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image, Text } from 'react-native';


class SessionView extends React.Component {
  constructor(props) {
   super(props);
   this.state = { text: 'Name' };
  //  var initFirebase = new Auth
   setTimeout(function () {
    //  console.log(initFirebase.getUserId());
    //  initFirebase.storeData()
  }, 2000);
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
