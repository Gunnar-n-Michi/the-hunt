import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export default class Database {
  constructor(session) {
    this.session = session
    this.uid = null

    const firebaseConfig = {
      apiKey: "AIzaSyDGJ2zie6mpdFyTEmwb5v-ibXAzIIJwHfk",
      authDomain: "the-hunt-9775d.firebaseapp.com",
      databaseURL: "https://the-hunt-9775d.firebaseio.com",
      storageBucket: "the-hunt-9775d.appspot.com",
      messagingSenderId: "127434009828"
    };

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log ('change on user', user.uid);
        var isAnonymous = user.isAnonymous;
        this.uid = user.uid;
        this.initGameData({role: 'prey', coords: {}});
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
    updates['/' + this.session + '/' + this.uid] = payload;
    firebase.database().ref().update(updates);
  }

  setCurrentPosition = (_long, _lat) => {
    let d = new Date();
    let time = d.getTime();
    firebase.database().ref('/' + this.session + '/' + this.uid + '/coords/').update({
      [time]: {
        long: _long,
        lat: _lat
      }
    });
  }

  deleteUser = () => {
    this.uid.delete().then(function() {
      console.log ('user deleted');
    }, function(error) {
      console.log (error);
    });
  }

  suscribeToTopic = (topic) => {
    console.log ("Trying to Subscribe to topic: ", topic);
    data = firebase.database().ref(topic);
    data.on('value', function(snapshot) {
      console.log ("new data: ", snapshot.val())
    });
  }
}