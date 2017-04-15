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
    if( iconType == 'checkpoint'){
      icon = (
        <G fillOpacity="0.8">
          <Path d="M48,0C31,0,17.2,13.7,17.2,30.9c0,4.5,1,8.6,2.5,12.5L46.3,95c0.7,1.5,2.7,1.5,3.4,0l26.6-51.6c1.7-3.7,2.5-8,2.5-12.5 C78.8,13.7,65,0,48,0z M48,55.7c-13.8,0-25-11.2-25-25s11.2-25,25-25s25,11.2,25,25S61.8,55.7,48,55.7z"/>
          <Circle cx="48" cy="30.7" r="19.1"/>
        </G>
      )
    }else if (iconType == 'hunter'){
      icon = (
        <G fillOpacity="0.8">
          <Path d="M48,0C31,0,17.2,13.7,17.2,30.9c0,4.5,1,8.6,2.5,12.5L46.3,95c0.7,1.5,2.7,1.5,3.4,0l26.6-51.6c1.7-3.7,2.5-8,2.5-12.5 C78.8,13.7,65,0,48,0z M48,55.7c-13.8,0-25-11.2-25-25s11.2-25,25-25s25,11.2,25,25S61.8,55.7,48,55.7z"/>
          <Path d="M54.2,29.6H41.8c-3.4,0-6,2.8-6,6v11.7c3.4,2.5,7.6,4,12.2,4s8.8-1.5,12.2-4V35.6C60.2,32.2,57.4,29.6,54.2,29.6z"/>
          <Circle cx="48" cy="21.1" r="6.3"/>
        </G>
      )
    }else if (iconType == 'prey'){
      icon = (
        <G fillOpacity="0.8">
          <Path d="M48,0C31,0,17.2,13.7,17.2,30.9c0,4.5,1,8.6,2.5,12.5L46.3,95c0.7,1.5,2.7,1.5,3.4,0l26.6-51.6c1.7-3.7,2.5-8,2.5-12.5 C78.8,13.7,65,0,48,0z M48,55.7c-13.8,0-25-11.2-25-25s11.2-25,25-25s25,11.2,25,25S61.8,55.7,48,55.7z"/>
          <Path d="M42.8,25.4c-0.4,0.1-0.8,0-1.1-0.3c-0.6-0.5-0.8-1.4-0.3-2l4.5-6c0.2-0.3,0.6-0.5,1-0.6c0,0,0,0,0,0c0.4-0.1,0.8,0,1.1,0.3 l6,4.5c0.6,0.5,0.8,1.4,0.3,2c-0.5,0.6-1.4,0.8-2,0.3L47.4,20l-3.6,4.9C43.6,25.1,43.2,25.3,42.8,25.4z"/>
          <Path d="M44,39.8c-0.7,0-1.4-0.5-1.6-1.3c-0.2-0.9,0.4-1.7,1.2-1.9l6.3-1.4l-5-5c-0.6-0.6-0.6-1.7,0-2.3c0.6-0.6,1.7-0.6,2.3,0 l7.1,7.1c0.4,0.4,0.6,1,0.4,1.6c-0.2,0.6-0.6,1-1.2,1.1l-9.2,2.1C44.2,39.8,44.1,39.8,44,39.8z"/>
          <Path d="M33,44.1c-0.4,0-0.8-0.2-1.1-0.5c-0.6-0.6-0.6-1.6,0-2.3l10.6-10.6l2.3,2.2L34.2,43.6C33.9,43.9,33.4,44.1,33,44.1z"/>
          <Path d="M64.4,26.7c-0.3-0.8-1.2-1.1-2-0.8l-5.6,2.5l-1.5-3.3l-1.4,4.3l0.8,1.8l0,0c0.4,0.7,1.2,1,2,0.7l6.9-3.1 C64.4,28.3,64.8,27.4,64.4,26.7z"/>
          <Path d="M58.9,15.9c0-0.5,0.1-1.3,0.1-2.2c0.1-2-2.4-2.1-3.6-1.1c-1.3,1-3.6,2.5-6.3,1.5c1.3,1.9,4.5,1.8,7.3,1 c0.8-0.2,1.2,0.5,1.3,1c-1.2,0.4-2.1,1.6-2.1,3c0,1.7,1.4,3.2,3.2,3.2c1.7,0,3.2-1.4,3.2-3.2C62,17.4,60.6,15.9,58.9,15.9z"/>
        </G>
      )
    }

    return (
      <View style={styles.container}>
      <Svg
        height="64"
        width="96"
        viewBox="0 0 64 116" style="enable-background:new 0 0 100 100;"
      >
        { icon }
        <Text
            x="50"
            y="96"
            textAnchor="middle"
            fontWeight="bold"
            fontSize="16"
            fill="black"
        >{description.toUpperCase()}</Text>
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
