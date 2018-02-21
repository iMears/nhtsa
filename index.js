const axios = require('axios');

class NhtsaVehicle {
  static get URL_BASE() {
    return 'https://vpic.nhtsa.dot.gov/api/vehicles';
  }

  static get DEFAULT_FORMAT() {
    return 'json';
  }

  static decodeVIN(vin, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!vin) reject('Invalid VIN');
      const url = `${this.URL_BASE}/DecodeVin/${vin}?format=${format}`;
      console.log(`making call to ${url}`);

      axios.get(url).then(
        response => resolve(response),
        error => reject(error)
      );
    });
  }
}

module.exports = NhtsaVehicle;
