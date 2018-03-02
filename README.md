# nhtsa-vehicle [![CircleCI](https://circleci.com/gh/iMears/nhtsa-vehicle.svg?style=svg)](https://circleci.com/gh/iMears/nhtsa-vehicle)
A NPM package for fetching and parsing vehicle data from the [NHTSA API](https://vpic.nhtsa.dot.gov/api/Home)

## Basic usage
```javascript
const NHTSAVehicle = require('nhtsa-vehicle');

(async () => {
  const response = await NHTSAVehicle.decodeVIN('WUAAU34248N006164');

  console.log(response.data);
})();
```

[Try it out](https://npm.runkit.com/nhtsa-vehicle) in your browser!
