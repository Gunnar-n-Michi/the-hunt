import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { store } from '../store/store';
import { setCurrentUserId } from '../actions/userInfoActions'

export default class Database {
  constructor(props) {
    console.log("STATATATATTE: ", props);
    this.session = props.sessionName
    this.uid = null
    this.playerName = props.playerName
    this.role = props.role

    const firebaseConfig = {
      apiKey: "AIzaSyDGJ2zie6mpdFyTEmwb5v-ibXAzIIJwHfk",
      authDomain: "the-hunt-9775d.firebaseapp.com",
      databaseURL: "https://the-hunt-9775d.firebaseio.com",
      storageBucket: "the-hunt-9775d.appspot.com",
      messagingSenderId: "127434009828"
    };

    // connect to firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var isAnonymous = user.isAnonymous;
        this.uid = user.uid;
        console.log("In Database Store: ", this.store);
        props.setUserId(this.uid);
        this.addUserToDatabase(this.uid, {name: this.playerName, role: this.role});
      } else {
        firebase.auth().signInAnonymously().catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log ('error', errorMessage);
        });
      }
    });
  }

  getUserId = () => {
    return this.uid
  }


  addUserToDatabase = (uid, obj) => {
    if (obj != null && obj != null){
      firebase.database().ref('/' + this.session + '/users/').update({
        [uid]: obj
      });
    }
  }

  setCurrentPosition = (obj) => {
    let d = new Date();
    let time = d.getTime();
    if (obj != null && this.uid != null){
      firebase.database().ref('/' + this.session + '/coords/' + '/' + this.uid).update({
        [time]: obj
      });
    }
  }

  deleteUser = () => {
    this.uid.delete().then(function() {
      AsyncStorage.clear();
    }, function(error) {
      console.log (error);
    });
  }

  suscribeToTopic = (topic) => {
    data = firebase.database().ref(topic);
    data.on('value', function(snapshot) {
      console.log ("new data: ", snapshot.val())
    });
  }

  suscribeToUserPosition = (uid, callback) => {
    // console.log("session: ", this.session, "uid: ", uid);
    data = firebase.database().ref('/' + this.session + '/coords/' + uid + '/');
    data.on('child_added', function(snapshot) {
      callback(snapshot);
    });
  }

  suscribeToNewUserAdded = (callback) => {
    // console.log("session: ", this.session, "uid: ", uid);
    data = firebase.database().ref('/' + this.session + '/users/');
    data.on('child_added', function(snapshot) {
      callback(snapshot);
    });
  }
}
