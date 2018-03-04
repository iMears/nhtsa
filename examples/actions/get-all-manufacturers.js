const NHTSA = require('nhtsa');

// Promise example of #getAllManufaturers()
NHTSA.getAllManufacturers().then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
