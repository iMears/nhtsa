const NhtsaVehicle = require('./index');

(async () => {
  try {
    const response = await NhtsaVehicle.decodeVIN('tacos');
    console.log(response.data);
  } catch(error) {
    console.log(error);
  }
})();
