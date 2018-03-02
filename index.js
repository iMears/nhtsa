const axios = require('axios');
const validateVIN = require('./validate-vin');
const validateFormat = require('./validate-format');

class NHTSAVehicle {
  static get URL_BASE() {
    return 'https://vpic.nhtsa.dot.gov/api/vehicles';
  }

  static get DEFAULT_FORMAT() {
    return 'json';
  }

  static validate(vin, format) {
    if(!validateFormat(format)) reject(new Eror('Invalid format'));
    if(!validateVIN(vin)) reject(new Error('Invalid VIN'));
  }

  static decodeVIN(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVin/${vin}${queryString}`;

      axios.get(url).then(
        response => resolve(response),
        error => reject(error)
      );
    });
  }

  static decodeVINFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVinValues/${vin}${queryString}`;

      axios.get(url).then(
        response => resolve(response),
        error => reject(error)
      );
    });
  }
}

module.exports = NHTSAVehicle;
