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

  static validate(vin, format, reject) {
    if(!validateFormat(format)) reject(new Eror('Invalid format'));
    if(!validateVIN(vin)) reject(new Error('Invalid VIN'));
  }

  static generateQueryString(format, modelYear) {
    return `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`
  }

  static generateUrl(endpoint, vin, format, modelYear) {
    const queryString = this.generateQueryString(format, modelYear);

    return `${this.URL_BASE}/${endpoint}/${vin}${queryString}`;
  };

  static makeRequest(url, resolve, reject) {
    axios.get(url).then(
      response => resolve(response),
      error => reject(error)
    );
  }

  static decodeVin(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const url = this.generateUrl('DecodeVin', vin, format, modelYear);

      this.makeRequest(url, resolve, reject);
    });
  }

  static decodeVinFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const url = this.generateUrl('DecodeVinValues', vin, format, modelYear);

      return this.makeRequest(url, resolve, reject);
    });
  }

  static decodeVinExtended(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const url = this.generateUrl('DecodeVinExtended', vin, format, modelYear);

      return this.makeRequest(url, resolve, reject);
    });
  }

  static decodeVinExtendedFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const url = this.generateUrl('DecodeVinValuesExtended', vin, format, modelYear);

      return this.makeRequest(url, resolve, reject);
    });
  }
}

module.exports = NHTSAVehicle;
