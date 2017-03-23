import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

export default class geo{
  var config = {
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
  }

  static reconfigure(options){
    config = options;
    BackgroundGeolocation.configure(config);
  }

  static changeDistanceFilter(distance){
    config.distanceFilter = distance;
    BackgroundGeolocation.configure(config);
  }
  static changeInterval(interval){
    config.interval = interval;
    BackgroundGeolocation.configure(config);
  }

  static initializeGeo = () =>{
    BackgroundGeolocation.configure(config);

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
