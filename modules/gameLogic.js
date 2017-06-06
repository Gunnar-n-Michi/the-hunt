import * as helpers from '../utils/helpers';
import { getState } from '../store/store';

export default class GameLogic {
  // 
  // var markers = [
  //   {
  //     shouldRender: true,
  //     title: "Hunter",
  //     iconType: "checkpoint",
  //     description: "Checkpoint 1",
  //     coordinate: {
  //       latitude: 48.138295,
  //       longitude: 11.515238,
  //     },
  //   },
  //   {
  //     shouldRender: true,
  //     title: "Hunter",
  //     iconType: "prey",
  //     description: "Michael",
  //     coordinate: {
  //       latitude: 48.238295,
  //       longitude: 11.515238,
  //     },
  //   },
  //   {
  //     shouldRender: true,
  //     title: "Hunter",
  //     iconType: "hunter",
  //     description: "Gunnar",
  //     coordinate: {
  //       latitude: LATITUDE,
  //       longitude: LONGITUDE,
  //     },
  //   },
  // ];


  constructor(props) {
    console.log("GameLogic: ", props);
    this.props = props
  }

  getUserGeoPosition(callback) {
    this.timer = new helpers.Monoflop(this.handleGeoLocations)
  }

  handleGeoLocations = (callback) => {
    console.log(_data, getState())
    let geoPos = getState().currentUser.geoposition
    // TODO: The following part describes the pseudo code which is needed to rneder
    // the current state to the ma
    // UPDATE MARKER OBJECT HERE
    // THEN CALLBACK
    callback(geoPos)
    this.timer.start(callback, 10000)

  }


}
