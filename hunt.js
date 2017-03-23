import React, { Component } from 'react';
import { configureStore } from './store/store';
import { Provider } from 'react-redux';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import * as NavigationService from './utils/navigationService';
import SessionView from './views/sessionView';
import geo from './utils/geo'
// import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
// import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import MapView from './views/mapView';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class hunt extends Component {
  constructor (props) {
    super(props);
    this.state = {
      store: configureStore(),
      // lastPosition: 'unknown'
    };
  }

  componentWillMount(){
    geo.initializeGeo();
  }



  componentWillUnmount(){
    // stop listening for events
    // this.notificationListener.remove();
    // this.refreshTokenListener.remove();
  }

  // watchID: ?number = null;

  componentDidMount () {
    NavigationService.setNavigator(this.navigator);

    // FCM.requestPermissions(); // for iOS
    // FCM.getFCMToken().then(token => {
    //     console.log("fcm instance token is: " + token)
    //     // store fcm token in your server
    // });
    //
    // FCM.presentLocalNotification({
    //     id: "UNIQ_ID_STRING",                               // (optional for instant notification)
    //     title: "Gunnar titel",                     // as FCM payload
    //     body: "Gunnar är bäst",                    // as FCM payload (required)
    //     sound: "default",                                   // as FCM payload
    //     priority: "high",                                   // as FCM payload
    //     click_action: "ACTION",                             // as FCM payload
    //     badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
    //     number: 10,                                         // Android only
    //     ticker: "My Notification Ticker",                   // Android only
    //     auto_cancel: true,                                  // Android only (default true)
    //     large_icon: "ic_launcher",                           // Android only
    //     icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
    //     big_text: "Show when notification is expanded",     // Android only
    //     sub_text: "This is a subText",                      // Android only
    //     color: "red",                                       // Android only
    //     vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
    //     tag: 'some_tag',                                    // Android only
    //     group: "group",                                     // Android only
    //     my_custom_data:'my_custom_field_value',             // extra data you want to throw
    //     lights: true,                                       // Android only, LED blinking (default false)
    //     show_in_foreground: true                                  // notification when app is in foreground (local & remote)
    // });

    // this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
    //     // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    //     if(notif.local_notification){
    //       //this is a local notification
    //     }
    //     if(notif.opened_from_tray){
    //       //app is open/resumed because user clicked banner
    //     }
    //
    //     console.log("received notification: " + notif);
    //     // await someAsyncCall();
    //
    //     // if(Platform.OS ==='ios'){
    //     //   //optional
    //     //   //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
    //     //   //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
    //     //   //notif._notificationType is available for iOS platfrom
    //     //   switch(notif._notificationType){
    //     //     case NotificationType.Remote:
    //     //       notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
    //     //       break;
    //     //     case NotificationType.NotificationResponse:
    //     //       notif.finish();
    //     //       break;
    //     //     case NotificationType.WillPresent:
    //     //       notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
    //     //       break;
    //     //   }
    //     // }
    // });
    //
    // FCM.subscribeToTopic('/topics/test');
    //
    // FCM.getInitialNotification().then(notif=>console.log(notif));
    //
    // this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
    //     console.log("fcm instance token is: " + token);
    //     // fcm token may not be available on first load, catch it here
    // });
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <AppNavigator ref={(nav) => { this.navigator = nav; }}/>
      </Provider>
    );
  }
}

//

const AppNavigator = StackNavigator (
  {
  SessionView: { screen: SessionView },
  MapView: { screen: MapView },
  },
  {
    navigationOptions: {
      title: 'Home Screen',
      header: {
        visible: false
      }
    }
  }
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
