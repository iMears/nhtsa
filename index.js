const axios = require('axios');
const validateVin = require('./validate-vin');
const validateFormat = require('./validate-format');

class NHTSA {
  static get URL_BASE() {
    return 'https://vpic.nhtsa.dot.gov/api/vehicles';
  }

  static get DEFAULT_FORMAT() {
    return 'JSON';
  }

  static validate(vin, format, reject) {
    if(!validateFormat(format)) reject(new Eror('Invalid format'));
    if(!validateVin(vin)) reject(new Error('Invalid VIN'));
  }

  static makeRequest(url, resolve, reject) {
    axios.get(url).then(
      response => resolve(response),
      error => reject(error)
    );
  }

  static decodeVin(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVin/${vin}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static decodeVinFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVinValues/${vin}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  static decodeVinExtended(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVinExtended/${vin}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  static decodeVinExtendedFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVinValuesExtended/${vin}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  static decodeWmi(vin, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/DecodeWMI${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }
}

module.exports = NHTSA;
