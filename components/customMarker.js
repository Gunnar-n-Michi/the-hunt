import React, { PropTypes } from 'react';
import * as helpers from '../utils/helpers';
import {
  StyleSheet,
  View
} from 'react-native';

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop,
    Text
} from 'react-native-svg';



const propTypes = {
  description: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
};

const defaultProps = {
  fontSize: 13,
};

class CustomMarker extends React.Component {
  render() {
    const { fontSize, description, iconType } = this.props;
    let icon;
    if(iconType == 'checkpoint'){
      icon = (
        <Path fill="black" d="M40.608,20.833h-4.914V77.52h-7.025v3h18.965v-3h-7.025V20.833z M42.112,22.842v21.709c2.999-1.251,5.774,0.222,8.559,0.885  c7.743,1.844,16.778-2.5,19.159-12.924C58.063,35.487,54.562,18.559,42.112,22.842z"/>
      )
    }else if (iconType == 'player'){
      icon = (
        <G>
          <Path fill="black" d="M55.1,36.8H44.9c-2.8,0-5,2.3-5,5v9.7c2.8,2.1,6.3,3.3,10.1,3.3s7.3-1.2,10.1-3.3v-9.7C60.1,39,57.8,36.8,55.1,36.8z"/>
          <Path fill="black" d="M50,12.3c-14.1,0-25.5,11.4-25.5,25.6c0,3.7,0.8,7.1,2.1,10.3l22,42.7c0.6,1.2,2.2,1.2,2.8,0l22-42.7  c1.4-3.1,2.1-6.6,2.1-10.3C75.5,23.7,64.1,12.3,50,12.3z M50,58.4c-11.4,0-20.7-9.3-20.7-20.7S38.6,17,50,17  c11.4,0,20.7,9.3,20.7,20.7S61.4,58.4,50,58.4z"/>
          <Circle cx="50" cy="29.8" r="5.2"/>
        </G>
      )
    }
    return (
      <View style={styles.container}>
      <Svg
        height="64"
        width="96"
        viewBox="0 0 64 96" style="enable-background:new 0 0 100 100;"
      >
        { icon }
        <Text
            x="50"
            y="80"
            textAnchor="middle"
            fontWeight="bold"
            fontSize="16"
            fill="blue"
        >{description}</Text>
      </Svg>
      </View>
    );
  }
}

CustomMarker.propTypes = propTypes;
CustomMarker.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FF5A5F',
    padding: 2,
    borderRadius: 3,
    borderColor: '#D23F44',
    borderWidth: 0.5,
  },
  dollar: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#FF5A5F',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#D23F44',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = CustomMarker;
