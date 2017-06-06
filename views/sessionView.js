import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image, Text } from 'react-native';
import { setRunning } from '../actions/uiStateActions'



class SessionView extends React.Component {
  constructor(props) {
   super(props);
   this.state = { text: 'Name' };
  }

  render() {
    console.log (this.props)
    return (
      <View style={styles.container}>
        <Text>{this.props.running ? "True" : "False"}</Text>
        <Button onPress={this._handlePress.bind(this)} title="Click me"></Button>
      </View>
    );
  }

  _handlePress = () => {
    console.log ("A Press");
    const { navigate } = this.props.navigation;
    this.props.setRunning(true);
    navigate('MapView');
  }

  componentWillUnmount() {
    initFirebase.deleteUser();
  }

  componentDidMount(){
    console.log ('Session View Mounted: ', this.props);
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
    running: state.uiState.running
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRunning: (isRunning) => {
      dispatch(setRunning(isRunning))
    }
  }
}

const sessionView = connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionView)


export default sessionView
