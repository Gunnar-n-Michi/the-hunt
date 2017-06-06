import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { store } from '../store/store';
import { setCurrentUserId } from '../actions/userInfoActions'

export default class Database {
  constructor(props) {
    // console.log("STATATATATTE: ", props);
    this.session = null;

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
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        //Nice. We're signed in!
      }else{
        //if we for some reason were signed out, then sign back in!!
        firebase.auth().signInAnonymously();
      }
    })

    var promise = new Promise((resolve, reject) => {
      firebase.auth().signInAnonymously().then((user)=>{
        // console.log(user);
        resolve(user.uid)
      },(error)=>{
        reject(error);
      });
    })

    // return firebase.auth().signInAnonymously();
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

  findSessionDB = (sessionName) => {
    console.log("checking if session exists: " + sessionName );
    this.session = sessionName;
    //Is the name available?
    var create = new Promise(function(resolve, reject){
      firebase.database().ref('/' + sessionName).once('value', (snapshot) => {
        if(snapshot.exists()){
          console.log("Found the session in db.");
          resolve();
        }else{
          reject(Error("No such session found in db"));
        }
      });
    });

    return create;
  }

  // getUserId = () => {
  //   return this.uid
  // }

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

  addCurrentPositionDB = (uid, obj) => {
    let d = new Date();
    let time = d.getTime();
    if (obj != null){
      firebase.database().ref('/' + this.session + '/coords/' + '/' + uid).update({
        [time]: obj
      });
    }
  }

  deleteUserDB = (uid) => {
    // this.uid.delete().then(function() {
    //   AsyncStorage.clear();
    // }, function(error) {
    //   console.log (error);
    // });
    var ref = firebase.database().ref('/' + this.session + '/users/' + uid);
    ref.remove();
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
