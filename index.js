const axios = require('axios');
const validateVIN = require('./validate-vin');

class NHTSAVehicle {
  static get URL_BASE() {
    return 'https://vpic.nhtsa.dot.gov/api/vehicles';
  }

  static get DEFAULT_FORMAT() {
    return 'json';
  }

  static decodeVIN(vin, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateVIN(vin)) reject(new Error('Invalid VIN'));

      const url = `${this.URL_BASE}/DecodeVin/${vin}?format=${format}`;

      axios.get(url).then(
        response => resolve(response),
        error => reject(error)
      );
    });
  }
}

module.exports = NHTSAVehicle;
