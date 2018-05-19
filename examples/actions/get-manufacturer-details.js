const nhtsa = require('nhtsa');

// Promise example of #getManufacturerDetails(manufacturer)
nhtsa.getManufacturerDetails('volkswagen').then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
