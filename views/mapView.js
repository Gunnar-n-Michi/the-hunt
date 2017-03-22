import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, TextInput, View, TouchableOpacity, Button, Image, Text } from 'react-native';
import MapContainer from 'react-native-maps';


export default class MapView extends React.Component {
  constructor(props) {
   super(props);
 }

  render() {
    console.log (this.props)
    return (
      <View style={styles.container}>
        <MapContainer
          style={styles.map}
          initialRegion={{
            latitude: 57.705207,
            longitude: 12.000576,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
  ...StyleSheet.absoluteFillObject,
},
});
