const NHTSA = require('nhtsa');

// Promise example of #getAllManufaturers(format)
NHTSA.getAllManufacturers(4, 'CSV').then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
