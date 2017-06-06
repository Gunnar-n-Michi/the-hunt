import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image, Text, Modal, Dimensions } from 'react-native';
import { setSessionName, setSessionCreated } from '../actions/sessionStateActions';
import { setCurrentUserName, setCurrentUserId, addNewUser, addLocationToUser } from '../actions/userInfoActions';
import Database from '../modules/database';
import Col from '../constants/colors'

var {height, width} = Dimensions.get('window');

console.log("H/W: ", height, width);

class StartView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showCreateSessionDialog: false,
      showJoinSessionDialog: false,
      // sessionName: null,
      createSessionFeedback: null,
      joinSessionFeedback: null
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
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{width: width, height: 100}}>
            <Text>The HUNT!</Text>
            <Text>Choose player name:</Text>
            <TextInput
              value = {this.props.playerName}
              onChangeText={(text) => this.props.setPlayerName(text)}
              style={{width: width, height: 40, backgroundColor: Col.midGrey}}
              placeholderTextColor='#a4a4a4'
            />
          </View>
          <View style={{width: width, height: 100, justifyContent: 'center'}}>
            <Button onPress={this.onClickCreate} title="Create game session"></Button>
          </View>
          <View style={{width: width, height: 100, justifyContent: 'center'}}>
            <Button onPress={this.onClickJoin} title="Join game session"></Button>
          </View>
        </View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showCreateSessionDialog}
          onRequestClose={this.onCloseDialog}
          >
         <View style={styles.inputWrapper}>
          <View>
            <Text>Choose Name of game session. {this.state.createSessionFeedback}</Text>
            <TextInput
              value = {this.props.sessionName}
              onChangeText={(text) => this.props.setSessionName(text)}
              style={{width: width, height: 40, backgroundColor: Col.midGrey}}
              placeholderTextColor='#a4a4a4'
            />
          <Button onPress={this.onCreateSessionContinue} title="Continue"></Button>

          </View>
         </View>
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showJoinSessionDialog}
          onRequestClose={this.onCloseDialog}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Name of game session to join. {this.state.joinSessionFeedback}</Text>
            <TextInput
              value = {this.props.sessionName}
              onChangeText={(text) => this.props.setSessionName(text)}
            />
          <Button onPress={this.onJoinSessionContinue} title="Continue"></Button>

          </View>
         </View>
        </Modal>
      </View>
    );
  }

  onClickCreate = () =>{
    this.setState({showCreateSessionDialog: true})
  }

  onClickJoin = () => {
    this.setState({showJoinSessionDialog: true})
  }

  onCloseDialog = () => {
    this.setState({showCreateSessionDialog: false, showJoinSessionDialog: false});
  }

  onCreateSessionContinue = () =>{
    //Create db connecition if doesn't exist
    if(global.db === null){
      global.db = new Database(this.props);
      console.log("Database Created!");
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
        this.setState({showCreateSessionDialog: false});
      },
      (error) => {
        this.setState({createSessionFeedback: "Unavailable. Choose another name."});
        console.log("createSession rejected: " + error);
        throw 'sessionName taken';
      }
    ).then(()=>{
      // console.log("adding self to user path in session");
      this.props.setSessionCreated(true);
      return global.db.addUserToSessionDB(this.props.state.userInfo.currentUser.uid, {playerName: this.props.playerName});
    }).then(
      ()=>{
        console.log("added user");
        const { navigate } = this.props.navigation;
        navigate('WaitingLounge');

      },
      (error)=>{console.log("addUserToSession rejected: " + error);}
    );

    global.db.subscribeToNewUserAddedDB((data) => {
      let uid = data.key
      this.props.newUser(uid, data.val());
      console.log("subscription trigggered. New user added: " + uid);
      if(uid != this.props.state.userInfo.currentUser.uid){
        global.db.subscribeToUserPositionDB(uid, this.positionCallback);
        console.log("subscribing to position for user: " + uid);
      }

    });
  }

  onJoinSessionContinue = () =>{
    this.setState({joinSessionFeedback: null});
    //Create db connecition if doesn't exist
    if(global.db === null){
      global.db = new Database(this.props);
    }

    // console.log("trying to join session: " + this.props.sessionName);

    //Here is our epic setup sequence for joining a session. First create user.
    global.db.initializeUserDB().then((uid) => {
      console.log("uid: ", uid);
      this.props.setUserId(uid);
    }).then(() =>{
      return global.db.findSessionDB(this.props.sessionName);
    }).then(
      () => {
        this.setState({showJoinSessionDialog: false});
      },
      (error) => {
        this.setState({joinSessionFeedback: "Couldn't find that game session!"});
        console.log("joinSession rejected: " + error);
        throw 'no session found';
      }
    ).then(()=>{
      console.log("adding self to user path in session");
      this.props.setSessionCreated(true);
      return global.db.addUserToSessionDB(this.props.state.userInfo.currentUser.uid, {playerName: this.props.playerName});
    }).then(
      ()=>{
        console.log("added user");
        const { navigate } = this.props.navigation;
        navigate('WaitingLounge');

      },
      (error)=>{console.log("addUserToSession rejected: " + error);}
    );

    global.db.subscribeToNewUserAddedDB((data) => {
      let uid = data.key
      this.props.newUser(uid, data.val());
      console.log("subscription trigggered. New user added: " + uid);
      if(uid != this.props.state.userInfo.currentUser.uid){
        global.db.subscribeToUserPositionDB(uid, this.positionCallback);
        console.log("subscribing to position for user: " + uid);
      }

    });
  }

  positionCallback = (data) => {
    let coord =  data.val();
    console.log("User position data: ", data.key, coord);
    this.props.newLocationToUser(data.key, coord);
    // coordinate = { latitude: info.latitude, longitude: info.longitude }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});




const mapStateToProps = (state, ownProps) => {
  // console.log("OwnProps: ", ownProps, this)
  return {
    sessionName: state.sessionState.sessionName,
    playerName: state.userInfo.currentUser.name,
    role: state.userInfo.currentUser.role,
    state: state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSessionName: (name) => {
      dispatch(setSessionName(name))
    },
    setSessionCreated: (isCreated) => {
      dispatch(setSessionCreated(isCreated))
    },
    setPlayerName: (name) => {
      dispatch(setCurrentUserName(name))
    },
    setUserId: (uid) => {
      dispatch(setCurrentUserId(uid))
    },
    newUser: (uid, info) => {
      dispatch(addNewUser(uid, info))
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
