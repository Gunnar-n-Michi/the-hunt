import * as helpers from '../utils/helpers';

export default class GameLogic {
  constructor(props) {
    console.log("GameLogic: ", props);
    console.log("Datatbase in GameLogic: ", global.db);
    let timer = new helpers.Monoflop(this.handleGeoLocations, 10000)

    timer.start('Test')
  }

  handleGeoLocations = (_data) => {
    console.log("GeoLocation in GameLogic", _data)
  }

}
