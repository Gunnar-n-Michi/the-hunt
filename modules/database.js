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

    const firebaseConfig = {
      apiKey: "AIzaSyDGJ2zie6mpdFyTEmwb5v-ibXAzIIJwHfk",
      authDomain: "the-hunt-9775d.firebaseapp.com",
      databaseURL: "https://the-hunt-9775d.firebaseio.com",
      storageBucket: "the-hunt-9775d.appspot.com",
      messagingSenderId: "127434009828"
    };

    // connect to firebase
    firebase.initializeApp(firebaseConfig);
  }

  initializeUserDB(){
    var promise = new Promise(function(resolve, reject){
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          resolve(user.uid);
        }else{
          reject(Error("fuuuuuu"));
        }
      })
    });
    firebase.auth().signInAnonymously();
    return promise;
  }

  createSessionDB = (sessionName) => {
    this.session = sessionName;
    //TODO: Make sure the check and creation is done atomically. Otherwise we might actually end up with two users create the same session.
    //Is the name available?
    var create = new Promise(function(resolve, reject){
      firebase.database().ref('/' + sessionName).once('value', (snapshot) => {
        if(!snapshot.exists()){
          console.log("gonna create it and put in the user!");
          var updates = {};
          updates[sessionName] = true;
          resolve(firebase.database().ref().update(updates));
        }else{
          reject(Error("session name already taken!"));
        }
      });
    });

    return create;

    // return create.then(() => {
    //   return firebase.database().ref('/').update(sessionName);
    // });
    //let's return the promise!
    // return firebase.database().ref('/').set(this.session);
  }

  joinSessionDB = () => {

  }

  getUserId = () => {
    return this.uid
  }

  addUserToSessionDB = (uid, obj) => {
    //TODO: Check so users don't pick same name.
    // console.log("uid: " + uid + ", obj: " + obj);
    if (uid != null && obj != null){
      var promise = firebase.database().ref('/' + this.session + '/users/').update({
        [uid]: obj
      });
      console.log("promise: " + promise);
      return promise;
    }
    throw 'wrong arguments provided. need an uid and a user object';
  }

  addCurrentPositionDB = (obj) => {
    let d = new Date();
    let time = d.getTime();
    if (obj != null){
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

  suscribeToTopicDB = (topic) => {
    data = firebase.database().ref(topic);
    data.on('value', function(snapshot) {
      console.log ("new data: ", snapshot.val())
    });
  }

  subscribeToUserPositionDB = (uid, callback) => {
    // console.log("session: ", this.session, "uid: ", uid);
    data = firebase.database().ref('/' + this.session + '/coords/' + uid + '/');
    data.on('child_added', function(snapshot) {
      callback(snapshot);
    });
  }

  subscribeToNewUserAddedDB = (callback) => {
    // console.log("session: ", this.session, "uid: ", uid);
    data = firebase.database().ref('/' + this.session + '/users/');
    data.on('child_added', function(snapshot) {
      callback(snapshot);
    });
  }
}
