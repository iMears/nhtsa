const NHTSA = require('nhtsa');
const vin = 'WUAAU34248N006164';

// Promise example of #decodeVin()
NHTSA.decodeVin(vin).then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
