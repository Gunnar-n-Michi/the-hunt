import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

export default class location{
  static initializeLocation = () =>{
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      locationTimeout: 30,
      notificationTitle: 'theHunt',
      notificationText: 'tracking active',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      // url: 'http://192.168.81.15:3000/location',
      // httpHeaders: {
      //   'X-FOO': 'bar'
      // }
    });

    BackgroundGeolocation.on('location', (location) => {
      //handle your locations here
      console.log("location: " + JSON.stringify(location));
      // Actions.sendLocation(location);
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      console.log("stationaryLocation: " + JSON.stringify(stationaryLocation));
      //handle stationary locations here
      // Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.start(() => {
      console.log('[DEBUG] BackgroundGeolocation started successfully');
    });
  }
}
