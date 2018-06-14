# nhtsa [![CircleCI](https://circleci.com/gh/iMears/nhtsa.svg?style=svg)](https://circleci.com/gh/iMears/nhtsa)[![npm](https://img.shields.io/npm/dt/express.svg)](https://github.com/iMears/nhtsa)
A [NPM package](https://www.npmjs.com/package/nhtsa) for fetching and parsing vehicle data from the [NHTSA Vehicle API](https://vpic.nhtsa.dot.gov/api/Home)

## Basic usage
```javascript
const nhtsa = require('nhtsa');

// Example using async/await
(async () => {
  const { data } = await nhtsa.decodeVin('WUAAU34248N006164');

  console.log(data);
})();

// Example using a promise
nhtsa.decodeVin('WUAAU34248N006164').then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
```

## API Actions

### Decode Vin
<details>
<summary>More info</summary>
<br>
The Decode VIN API will decode the VIN and the decoded output will be made available in the format of Key-value pairs. The IDs (VariableID and ValueID) represent the unique ID associated with the Variable/Value. In case of text variables, the ValueID is not applicable. Model Year in the request allows for the decoding to specifically be done in the current, or older (pre-1980), model year ranges. It is recommended to always send in the model year. This API also supports partial VIN decoding (VINs that are less than 17 characters). In this case, the VIN will be decoded partially with the available characters. In case of partial VINs, a `*` could be used to indicate the unavailable characters. The 9th digit is not necessary.
</details>

```javascript
const { data } = await nhtsa.decodeVin('WUAAU34248N006164');
```

### Decode VIN (flat format)
<details>
<summary>More info</summary>
<br>
The Decode VIN Flat Format API will decode the VIN and the decoded output will be made available in a flat file format. Model Year in the request allows for the decoding to specifically be done in the current, or older (pre-1980), model year ranges. It is recommended to always send in the model year. This API also supports partial VIN decoding (VINs that are less than 17 characters). In this case, the VIN will be decoded partially with the available characters. In case of partial VINs, a `*` could be used to indicate the unavailable characters.
</details>

```javascript
const { data } = await nhtsa.decodeVinFlatFormat('WUAAU34248N006164');
```

### Decode VIN Extended
<details>
<summary>More info</summary>
<br>
This is exactly like the Decode VIN method but provides additional information on variables related to other nhtsa programs like NCSA, Artemis etc.
</details>

```javascript
const { data } = await nhtsa.decodeVinExtended('WUAAU34248N006164');
```

### Decode VIN Extended (flat format)
<details>
<summary>More info</summary>
<br>
This is exactly like the Decode VIN (flat format) method but provides additional information on variables related to other nhtsa programs like NCSA, Artemis etc.
</details>

```javascript
const { data } = await nhtsa.decodeVinExtendedFlatFormat('WUAAU34248N006164');
```

### Decode WMI
<details>
<summary>More info</summary>
<br>
This provides information on the World Manufacturer Identifier for a specific WMI code. WMIs may be put in as either 3 characters representing VIN position 1-3 or 6 characters representing VIN positions 1-3 & 12-14. Example "JTD", "1T9131".
</details>

```javascript
const { data } = await nhtsa.decodeWmi('1FD');
```

### Decode SAE WMI
<details>
<summary>More info</summary>
<br>
This provides information on the World Manufacturer Identifier for a specific WMI code. WMIs may be put in as either 3 characters representing VIN position 1-3 or 6 characters representing VIN positions 1-3 & 12-14. Example "JTD", "1T9131".
</details>

```javascript
const { data } = await nhtsa.decodeSaeWmi('1FD');
```

### Get WMIs for Manufacturer
<details>
<summary>More info</summary>
<br>
Provides information on the all World Manufacturer Identifier (WMI) for a specified Manufacturer. Only WMI registered in vPICList are displayed. For a list of all WMIs for a specified Manufacturer see GetSAEWMIsForManufacturer.
</details>

```javascript
const { data } = await nhtsa.getWmisForManufacturer('hon');
```

### Get SAE WMIs for Manufacturer
<details>
<summary>More info</summary>
<br>
Provides information on the all World Manufacturer Identifier (WMI) for a specified Manufacturer. All WMI registered with SAE are displayed. For a list of WMIs registered with vPICList see GetWMIsForManufacturer.
</details>

```javascript
const { data } = await nhtsa.getSaeWmisForManufacturer('hon');
```

### Get All Makes
<details>
<summary>More info</summary>
<br>
This provides a list of all the Makes available in vPIC Dataset.
</details>

```javascript
const { data } = await nhtsa.getAllMakes();
```

### Get Parts
<details>
<summary>More info</summary>
<br>
This provides a list of ORGs with letter date in the given range of the dates and with specified Type of ORG. Up to 1000 results will be returned at a time.
</details>

```javascript
const type = 565;
const fromDate = '3/2/2018';
const toDate = '3/10/2018';
const page = 2;

const { data } = await nhtsa.getParts(type, fromDate, toDate, page);
```

### Get All Manufacturers
<details>
<summary>More info</summary>
<br>
This provides a list of all the Manufacturers available in vPIC Dataset. Results are provided in pages of 100 items, use parameter"page" to specify 1-st (default, 2nd, 3rd, ...Nth ... page.)
</details>

```javascript
const { data } = await nhtsa.getAllManufacturers();
```

### Get Manufacturer Details
<details>
<summary>More info</summary>
<br>
This provides the details for a specific manufacturer that is requested. This gives the results of all the manufacturers whose name is LIKE the manufacturer name. It accepts a partial manufacturer name as an input. Multiple results are returned in case of multiple matches.
</details>

```javascript
const { data } = await nhtsa.getManufacturerDetails('volkswagen');
```

### Get Makes for Manufacturer by Manufacturer Name
<details>
<summary>More info</summary>
<br>
This returns all the Makes in the vPIC dataset for a specified manufacturer whose name is LIKE the manufacturer name in vPIC Dataset. Manufacturer name can be a partial name, or a full name for more specificity (e.g., "HONDA", "HONDA OF CANADA MFG., INC.", etc.)
</details>

```javascript
const { data } = await nhtsa.getMakesForManufacturer('volkswagen');
```

[Try it out](https://npm.runkit.com/nhtsa) in your browser!
