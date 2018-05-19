const nhtsa = require('nhtsa');

// Promise example of #getAllManufaturers(format)
nhtsa.getAllManufacturers(4, 'CSV').then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
