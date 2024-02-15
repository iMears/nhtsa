import axios from 'axios';
import validateVin from './helpers/validate-vin';
import validateFormat from './helpers/validate-format';

class NHTSA {
  static URL_BASE = 'https://vpic.nhtsa.dot.gov/api/vehicles';
  static DEFAULT_FORMAT = 'JSON';

  static validate(vin, format, reject) {
    if (!validateFormat(format)) reject(new Error('Invalid format'));
    if (!validateVin(vin)) reject(new Error('Invalid VIN'));
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

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}` : ''}`;
      const url = `${this.URL_BASE}/DecodeVin/${vin}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static decodeVinFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}` : ''}`;
      const url = `${this.URL_BASE}/DecodeVinValues/${vin}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static decodeVinExtended(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}` : ''}`;
      const url = `${this.URL_BASE}/DecodeVinExtended/${vin}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static decodeVinExtendedFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}` : ''}`;
      const url = `${this.URL_BASE}/DecodeVinValuesExtended/${vin}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static decodeWmi(wmi, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/DecodeWMI/${wmi}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static decodeSaeWmi(wmi, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/DecodeSAEWMI/${wmi}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static getWmisForManufacturer(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/GetWMIsForManufacturer/${manufacturer}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static getSaeWmisForManufacturer(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/GetSAEWMIsForManufacturer/${manufacturer}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static getAllMakes(format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getAllMakes${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static getParts(type, fromDate, toDate, page = 1, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!type || !['string', 'number'].includes(typeof type)) reject(new Error('Invalid type'));
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?type=${type}&fromDate=${fromDate}&toDate=${toDate}&format=${format}&page=${page}`;
      const url = `${this.URL_BASE}/GetParts${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static getAllManufacturers(page = 1, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}&page=${page}`;
      const url = `${this.URL_BASE}/GetAllManufacturers${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static getManufacturerDetails(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/GetManufacturerDetails/${manufacturer}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static getMakesForManufacturer(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getmakeformanufacturer/${manufacturer}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  static getMakesForManufacturerAndYear(manufacturer, year, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if (!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `year=${year}?format=${format}`;
      const url = `${this.URL_BASE}/getmakeformanufacturer/${manufacturer}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }
}

export default NHTSA;
