const NHTSA = require('nhtsa');

// Promise example of #getManufacturerDetails(manufacturer)
NHTSA.getManufacturerDetails('volkswagen').then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
