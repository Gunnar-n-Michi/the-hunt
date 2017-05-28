import * as helpers from '../utils/helpers';
import { getState } from '../store/store';

export default class GameLogic {
  constructor(props) {
    console.log("GameLogic: ", props);
    this.timer = new helpers.Monoflop(this.handleGeoLocations)
    this.props = props

    this.timer.start('Send out positions', 10000)
  }

  handleGeoLocations = (_data) => {
    console.log(_data, getState())
    this.timer.start('Update:', 10000)
  }

}
