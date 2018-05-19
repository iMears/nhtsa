const axios = require('axios');
const validateVin = require('./helpers/validate-vin');
const validateFormat = require('./helpers/validate-format');

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

  // Decode VIN
  // /vehicles/DecodeVin/5UXWX7C5*BA?format=json&modelyear=2011
  static decodeVin(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVin/${vin}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Decode VIN (flat format)
  // /vehicles/DecodeVinValues/5UXWX7C5*BA?format=json&modelyear=2011
  static decodeVinFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVinValues/${vin}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Decode VIN Extended
  // /vehicles/DecodeVinExtended/5UXWX7C5*BA?format=json&modelyear=2011
  static decodeVinExtended(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVinExtended/${vin}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Decode VIN Extended (flat format)
  // /vehicles/DecodeVinValuesExtended/5UXWX7C5*BA?format=json&modelyear=2011
  static decodeVinExtendedFlatFormat(vin, format = this.DEFAULT_FORMAT, modelYear) {
    return new Promise((resolve, reject) => {
      this.validate(vin, format, reject);

      const queryString = `?format=${format}${modelYear ? `&modelYear=${modelYear}`: ''}`;
      const url = `${this.URL_BASE}/DecodeVinValuesExtended/${vin}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Decode WMI
  // /vehicles/DecodeWMI/1FD?format=json
  static decodeWmi(wmi, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/DecodeWMI/${wmi}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Decode SAE WMI
  // /vehicles/DecodeSAEWMI/109017?format=json
  static decodeSaeWmi(wmi, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/DecodeSAEWMI/${wmi}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Get WMIs for Manufacturer
  // /vehicles/GetWMIsForManufacturer/hon?format=json
  static getWmisForManufacturer(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/GetWMIsForManufacturer/${manufacturer}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Get SAE WMIs for Manufacturer
  // /vehicles/GetSAEWMIsForManufacturer/hon?format=json
  static getSaeWmisForManufacturer(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/GetSAEWMIsForManufacturer/${manufacturer}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Get All Makes
  // /vehicles/GetAllMakes?format=json
  static getAllMakes(format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getAllMakes${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Get Parts
  // /vehicles/GetParts?type=565&fromDate=1/1/2015&toDate=5/5/2015&format=json&page=1
  static getParts(type, fromDate, toDate, page = 1, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!type || !['string', 'number'].includes(typeof type)) reject(new Error('Invalid type'));
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?type=${type}&fromDate=${fromDate}&toDate=${toDate}&format=${format}&page=${page}`;
      const url = `${this.URL_BASE}/GetParts${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Get All Manufacturers
  // /vehicles/GetAllManufacturers?format=json&page=2
  static getAllManufacturers(page = 1, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}&page=${page}`;
      const url = `${this.URL_BASE}/GetAllManufacturers${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Get Manufacturer Details
  // /vehicles/GetManufacturerDetails/volkswagen?format=json
  static getManufacturerDetails(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/GetManufacturerDetails/${manufacturer}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Get Makes for Manufacturer by Manufacturer Name
  // /vehicles/getmakeformanufacturer/volkswagen?format=json
  static getMakesForManufacturer(manufacturer, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getmakeformanufacturer/${manufacturer}${queryString}`;

      this.makeRequest(url, resolve, reject);
    });
  }

  // Get Makes for Manufacturer by Manufacturer Name and Year
  // /vehicles/GetMakesForManufacturerAndYear/mer?year=2013&format=json
  static getMakesForManufacturerAndYear(manufacturer, year, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `year=${year}?format=${format}`;
      const url = `${this.URL_BASE}/getmakeformanufacturer/${manufacturer}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }
}

module.exports = NHTSA;
