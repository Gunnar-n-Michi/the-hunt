import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image, Text, Modal } from 'react-native';
import { setSessionName } from '../actions/sessionStateActions';
import { setCurrentUserName } from '../actions/userInfoActions';


class StartView extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      showSessionNameDialog: false,
      sessionName: null
    };
  }

  componentWillMount(){

  }

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  render(){
    return (
      <View style={styles.container}>
        <Text>The HUNT!</Text>
        <Text>Choose player name:</Text>
        <TextInput
          value = {this.props.playerName}
          onChangeText={(text) => this.props.setPlayerName(text)}
        />
        <Button onPress={this.onClickCreate} title="Create game session"></Button>
        <Button onPress={this.onClickJoin} title="Join game session"></Button>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showSessionNameDialog}
          onRequestClose={this.onCloseDialog}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Choose Name of game session</Text>
            <TextInput
              value = {this.props.sessionName}
              onChangeText={(text) => this.props.setSessionName(text)}
            />
            <Button onPress={this.onClickContinue} title="Continue"></Button>

          </View>
         </View>
        </Modal>
      </View>
    );
  }

  onClickCreate = () =>{
    this.setState({showSessionNameDialog: true})
  }

  onClickJoin = () => {

  }

  onCloseDialog = () => {
    this.setState({showSessionNameDialog: false});
  }


  onClickContinue = () =>{
    this.setState({showSessionNameDialog: false});
    //Create the session in the firebase here.
    const { navigate } = this.props.navigation;
    navigate('WaitingLounge');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
});


const mapStateToProps = (state) => {
  return {
    sessionName: state.sessionState.sessionName,
    playerName: state.userInfo.currentUser.name
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSessionName: (name) => {
      dispatch(setSessionName(name))
    },
    setPlayerName: (name) => {
      dispatch(setCurrentUserName(name))
    }
  }
}

const startView = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartView)


export default startView
