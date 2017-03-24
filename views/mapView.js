import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

import MapContainer from 'react-native-maps';
import Col from '../constants/colors'
import { connect } from 'react-redux'

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const markers = [
  {
    coordinate: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
  },
  {
    coordinate: {
      latitude: LATITUDE + 0.004,
      longitude: LONGITUDE - 0.004,
    },
  },
  {
    coordinate: {
      latitude: LATITUDE - 0.004,
      longitude: LONGITUDE - 0.004,
    },
  },
];

class MapView extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { markers }
  }

  // animate = () => {
  //   console.log ("this State: ", this.state);
  //   coordinate.timing({
  //     latitude: LATITUDE + ((Math.random() - 0.8) * (LATITUDE_DELTA / 2)),
  //     longitude: LONGITUDE + ((Math.random() - 0.8) * (LONGITUDE_DELTA / 2)),
  //   }).start();
  // }

  shouldComponentUpdate(nextProps, nextState) {
	   return nextProps.coordinate.latitude != this.state.coordinate.latitude && nextProps.coordinate.longitude != this.state.coordinate.longitude;
  }

  render() {
    console.log ("COORD STUFF", this.props)
    return (
      <View style={styles.container}>
        <MapContainer
          provider={this.props.provider}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          loadingIndicatorColor={Col.lightOrange}
          loadingBackgroundColor={Col.midGrey}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
        {markers.map(marker => (
          <MapContainer.Marker
            coordinate={marker.coordinate}
          />
        ))}
      </MapContainer>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.animate}
            style={[styles.bubble, styles.button]}
          >
            <Text>Animate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MapView.propTypes = {
  provider: MapContainer.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});


const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


const mapView = connect(
  mapStateToProps
)(MapView)


export default mapView
