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
import Col from '../constants/colors';
import { connect } from 'react-redux';
import CustomMarker from '../components/customMarker'
import * as helpers from '../utils/helpers';
import GameLogic from '../modules/gameLogic';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 48.141288;
const LONGITUDE = 11.517792;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



const markers = [
  {
    shouldRender: true,
    title: "Hunter",
    iconType: "checkpoint",
    description: "Checkpoint 1",
    coordinate: {
      latitude: 48.138295,
      longitude: 11.515238,
    },
  },
  {
    shouldRender: true,
    title: "Hunter",
    iconType: "prey",
    description: "Michael",
    coordinate: {
      latitude: 48.238295,
      longitude: 11.515238,
    },
  },
  {
    shouldRender: true,
    title: "Hunter",
    iconType: "hunter",
    description: "Gunnar",
    coordinate: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
  },
];

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }



  render() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: this.props.opacity,
        duration: 300,
      }
    ).start();

    let { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class MapView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
          showsPointsOfInterest={true}
          followsUserLocation={true}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
        {markers.map(marker => (
          helpers.conditionalRender(
            marker.shouldRender,
            <MapContainer.Marker coordinate={marker.coordinate}>
              <CustomMarker description={marker.description} iconType={marker.iconType}/>
            </MapContainer.Marker>
          )
        ))}
      </MapContainer>
      {helpers.conditionalRender(
        true,
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}} opacity={1}>
            <Text>Some notification</Text>
          </FadeInView>
        </View>
      )}
      </View>
    );
  }

  componentDidMount(){
    global.gL = new GameLogic(this.props)
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
    state: state
  }
}


const mapView = connect(
  mapStateToProps
)(MapView)


export default mapView
