import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { store } from '../store/store';
import { setCurrentUser } from '../actions/setCurrentUser'

export default class Database {
  constructor(session, state) {
    this.session = session
    this.uid = null
    this.store = store();

    // AsyncStorage.clear()

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
        console.log ('change on user', user.uid);
        var isAnonymous = user.isAnonymous;
        this.uid = user.uid;

        console.log("STORE: ", this.store);
        this.store.dispatch(setCurrentUser(this.uid));

        data = firebase.database().ref('/' + this.session + '/coords/' + this.uid + '/');
        data.on('child_added', function(snapshot) {
          console.log("subscription triggered: ", snapshot.key,  snapshot.val());
        });
        this.initGameData({
          coords: {
            [this.uid]: {

            }
          },
          users: {
            [this.uid]: {
              'lastUpdate': 'now',
              'role': 'prey'
            }
          },
        });
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


  initGameData = (payload) => {
    console.log ('current user', this.uid);
    let updates = {};
    updates['/' + this.session] = payload;
    firebase.database().ref().update(updates);
  }

  setCurrentPosition = (obj) => {
    let d = new Date();
    let time = d.getTime();
    firebase.database().ref('/' + this.session + '/coords/' + '/' + this.uid).update({
      [time]: obj
    });
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
    console.log("session: ", this.session, "uid: ", uid);
    data = firebase.database().ref('/' + this.session + '/coords/' + uid + '/');
    data.on('value', function(snapshot) {
      console.log("subscription triggered");
      callback(snapshot.val())
    });
  }
}
