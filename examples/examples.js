const nhtsa = require('nhtsa');
const vin = 'WUAAU34248N006164';

// Async/await example of #decodeVin()
(async () => {
  try {
    const { data } = await nhtsa.decodeVin(vin);
    console.log(data);
  } catch(error) {
    console.log(error);
  }
})();

// Promise example of #decodeVin()
nhtsa.decodeVin(vin).then(
  ({ data }) => console.log(data),
  error => console.log(error)
);

// Async/await example of #decodeVinFlatFormat()
(async () => {
  try {
    const { data } = await nhtsa.decodeVinFlatFormat(vin);
    console.log(data);
  } catch(error) {
    console.log(error);
  }
})();

// Promise example of #decodeVinFlatFormat()
nhtsa.decodeVinFlatFormat(vin).then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
