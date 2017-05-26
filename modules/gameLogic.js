import * as helpers from '../utils/helpers';

export default class GameLogic {
  constructor(props) {
    console.log("GameLogic: ", props);
    console.log("Datatbase in GameLogic: ", global.db);
    this.timer = new helpers.Monoflop(this.handleGeoLocations)
    this.props = props

    this.timer.start('Send out positions', 10000)
  }

  handleGeoLocations = (_data) => {
    console.log(_data, this.props)
    this.timer.start('Update:', 10000)
  }

}
