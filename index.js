const axios = require('axios');
const validateVIN = require('./validate-vin');

class NHTSAVehicle {
  static get URL_BASE() {
    return 'https://vpic.nhtsa.dot.gov/api/vehicles';
  }

  static get DEFAULT_FORMAT() {
    return 'json';
  }

  static validateFormat(format) {
    const allowedFormats = ['json', 'jsv', 'csv', 'xml'];

    return allowedFormats.includes(format.toLowerCase());
  }

  static decodeVIN(vin, format = this.DEFAULT_FORMAT, modelYear) {
    console.log(vin);
    return new Promise((resolve, reject) => {
      if(!this.validateFormat(format)) reject(new Eror('Invalid format'));
      if(!validateVIN(vin)) reject(new Error('Invalid VIN'));

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
      if(!this.validateFormat(format)) reject(new Eror('Invalid format'));
      if(!validateVIN(vin)) reject(new Error('Invalid VIN'));

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
