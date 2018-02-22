const NHTSAVehicle = require('./index');

(async () => {
  try {
    const response = await NHTSAVehicle.decodeVIN('WUAAU34248N006164');
    console.log(response.data);
  } catch(error) {
    console.log(error);
  }
})();
