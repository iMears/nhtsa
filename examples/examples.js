const NHTSA = require('nhtsa');
const vin = 'WUAAU34248N006164';

// Async/await example of #decodeVin()
(async () => {
  try {
    const { data } = await NHTSA.decodeVin(vin);
    console.log(data);
  } catch(error) {
    console.log(error);
  }
})();

// Promise example of #decodeVin()
NHTSA.decodeVin(vin).then(
  ({ data }) => console.log(data),
  error => console.log(error)
);

// Async/await example of #decodeVinFlatFormat()
(async () => {
  try {
    const { data } = await NHTSA.decodeVinFlatFormat(vin);
    console.log(data);
  } catch(error) {
    console.log(error);
  }
})();

// Promise example of #decodeVinFlatFormat()
NHTSA.decodeVinFlatFormat(vin).then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
