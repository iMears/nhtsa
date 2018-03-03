const NHTSAVehicle = require('./index');
const vin = 'WUAAU34248N006164';

// Async await example of NHTSAVehicle#decodeVinExtended()
(async () => {
  try {
    const response = await NHTSAVehicle.decodeVinExtended(vin);
    console.log(response.data);
  } catch(error) {
    console.log(error);
  }
})();
