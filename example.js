const NHTSAVehicle = require('./index');
const validVIN = 'WUAAU34248N006164';

// Async await example of NHTSAVehicle#decodeVIN()
(async () => {
  try {
    const response = await NHTSAVehicle.decodeVIN(validVIN);
    console.log(response.data);
  } catch(error) {
    console.log(error);
  }
})();

// Promise example of NHTSAVehicle#decodeVIN()
(() => {
  NHTSAVehicle.decodeVIN(validVIN).then(
    (response) => { console.log(response.data) },
    (error) => { console.log(error) }
  );
})();

// Async await example of NHTSAVehicle#decodeVINFlatFormat()
(async () => {
  try {
    const response = await NHTSAVehicle.decodeVINFlatFormat(validVIN);
    console.log(response.data);
  } catch(error) {
    console.log(error);
  }
})();

// Promise example of NHTSAVehicle#decodeVINFlatFormat()
(() => {
  NHTSAVehicle.decodeVINFlatFormat(validVIN).then(
    (response) => { console.log(response.data) },
    (error) => { console.log(error) }
  );
})();
