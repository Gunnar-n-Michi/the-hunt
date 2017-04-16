import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image, Text, Modal } from 'react-native';
import { setSessionName } from '../actions/sessionStateActions';
import { setCurrentUserName, setCurrentUserId, addNewUser, addLocationToUser } from '../actions/userInfoActions';
import Database from '../modules/database';

class StartView extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      showSessionNameDialog: false,
      sessionName: null,
      createSessionFeedback: null
    };
  }

  componentWillMount(){
    console.log("INIT This", this.context.store)
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
            <Text>Choose Name of game session. {this.state.createSessionFeedback}</Text>
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

    //Create the session in the firebase here.
    if(global.db === null){
      global.db = new Database(this.props);
    }

    //Here is our epic setup sequence. First create user. check if session name available
    global.db.initializeUserDB().then((uid) => {
      console.log("uid: ", uid);
      this.props.setUserId(uid);
    }).then(() =>{
      return global.db.createSessionDB(this.props.sessionName);
    }).then(
      (success) => {
        // console.log("promise success: " + success);
        this.setState({showSessionNameDialog: false});
      },
      (error) => {
        this.setState({createSessionFeedback: "Unavailable. Choose another name."});
        console.log("createSession rejected: " + error);
      }
    ).then(()=>{
      // console.log("adding self to user path in session");
      return global.db.addUserToSessionDB(this.props.state.userInfo.currentUser.uid, {playerName: this.props.playerName});
    }).then(()=>{console.log("added user");}, (error)=>{console.log("addUserToSession rejected: " + error);});
    //if successful
    // global.db.addUserToDatabase(this.props.playerName);


    global.db.subscribeToNewUserAddedDB((data) => {
      let currentUser = data.key
      this.props.newUser(currentUser, data.val());
      global.db.subscribeToUserPositionDB(currentUser, this._userPosition);
    });



    const { navigate } = this.props.navigation;
    // navigate('MapView');
  }

  _userPosition = (data) => {
    console.log("User position data: ", data.key, data.val());
    let info =  data.val();
    this.props.newLocationToUser(this.props.state.userInfo.currentUser.uid, info);
    // coordinate = { latitude: info.latitude, longitude: info.longitude }
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


const mapStateToProps = (state, ownProps) => {
  console.log("OwnProps: ", ownProps, this)
  return {
    sessionName: state.sessionState.sessionName,
    playerName: state.userInfo.currentUser.name,
    state: state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSessionName: (name) => {
      dispatch(setSessionName(name))
    },
    setPlayerName: (name) => {
      dispatch(setCurrentUserName(name))
    },
    setUserId: (uid) => {
      dispatch(setCurrentUserId(uid))
    },
    newUser: (currentUser, info) => {
      dispatch(addNewUser(currentUser, info))
    },
    newLocationToUser: (uid, info) => {
      dispatch(addLocationToUser(uid, info))
    }
  }
}

const startView = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartView)


export default startView
