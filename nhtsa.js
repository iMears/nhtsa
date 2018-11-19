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

  // Get Makes for Vehicle Type by Vehicle Type Name
  // /vehicles/GetMakesForVehicleType/car?format=json
  static getMakesForVehicleType(type, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getmakesforvehicletype/${type}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Vehicle Types for Make by Name
  // /vehicles/GetVehicleTypesForMake/mercedes?format=json
  static getVehicleTypesForMake(make, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getvehicletypesformake/${make}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Vehicle Types for Make by Id
  // /vehicles/GetVehicleTypesForMakeId/450?format=json
  static getVehicleTypesForMakeId(makeId, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getvehicletypesformakeid/${makeid}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Equipment Plant Codes
  // /vehicles/GetEquipmentPlantCodes/2015?format=json
  static getEquipmentPlantCodes(year, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getequipmentplantcodes/${year}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Models for Make
  // /vehicles/GetModelsForMake/honda?format=json
  static getModelsForMake(make, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getmodelsformake/${make}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Models for MakeId
  // /vehicles/GetModelsForMakeId/440?format=json
  static getModelsForMakeId(makeId, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getmodelsformakeid/${makeId}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Models for Make and a combination of Year and Vehicle Type
  // /vehicles/GetModelsForMakeYear/make/honda/modelyear/2015?format=csv
  // /vehicles/GetModelsForMakeYear/make/honda/vehicletype/truck?format=csv
  // /vehicles/GetModelsForMakeYear/make/honda/modelyear/2015/vehicletype/truck?format=csv
  static getModelsForMakeYear(make, year, type, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      let path = `/${make}`
      if (year) {
        path += `/modelyear/${year}`
      }

      if (type) {
        path += `/vehicletype/${type}`
      }

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getmodelsformakeyear/${path}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Models for Make Id and a combination of Year and Vehicle Type
  // /vehicles/GetModelsForMakeIdYear/makeId/474/modelyear/2015?format=csv
  // /vehicles/GetModelsForMakeIdYear/makeId/474/vehicletype/truck?format=csv
  // /vehicles/GetModelsForMakeIdYear/makeId/474/modelyear/2015/vehicletype/truck?format=csv
  static getModelsForMakeIdYear(makeId, year, type, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      let path = `/${makeId}`
      if (year) {
        path += `/modelyear/${year}`
      }

      if (type) {
        path += `/vehicletype/${type}`
      }

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getmodelsformakeidyear/${path}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Vehicle Variables List
  // /vehicles/GetVehicleVariableList?format=xml
  static getVehicleVariableList(format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getvehiclevariablelist${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Vehicle Variable Values List
  // /vehicles/GetVehicleVariableValuesList/battery type?format=jsv
  static getVehicleVariableValuesList(variable, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?format=${format}`;
      const url = `${this.URL_BASE}/getvehiclevariablevalueslist/${variable}${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }

  // Get Canadian vehicle specifications
  // /vehicles/GetCanadianVehicleSpecifications/?year=2011&make=Acura&format=csv
  static getCanadianVehicleSpecifications(year, make, format = this.DEFAULT_FORMAT) {
    return new Promise((resolve, reject) => {
      if(!validateFormat(format)) reject(new Error('Invalid format'));

      const queryString = `?year=${year}&make=${make}&format=${format}`;
      const url = `${this.URL_BASE}/getcanadianvehiclespecifications/${queryString}`;

      return this.makeRequest(url, resolve, reject);
    });
  }
}

module.exports = NHTSA;
