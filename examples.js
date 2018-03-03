const NHTSAVehicle = require('./index');
const vin = 'WUAAU34248N006164';

// Async await example of NHTSAVehicle#decodeVin()
(async () => {
  try {
    const response = await NHTSAVehicle.decodeVin(vin);
    console.log(response.data);
  } catch(error) {
    console.log(error);
  }
})();

// Promise example of NHTSAVehicle#decodeVin()
(() => {
  NHTSAVehicle.decodeVin(vin).then(
    (response) => { console.log(response.data) },
    (error) => { console.log(error) }
  );
})();

// Async await example of NHTSAVehicle#()
(async () => {
  try {
    const response = await NHTSAVehicle.decodeVinFlatFormat(vin);
    console.log(response.data);
  } catch(error) {
    console.log(error);
  }
})();

// Promise example of NHTSAVehicle#decodeVinFlatFormat()
(() => {
  NHTSAVehicle.decodeVinFlatFormat(vin).then(
    (response) => { console.log(response.data) },
    (error) => { console.log(error) }
  );
})();
