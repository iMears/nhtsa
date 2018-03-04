const NHTSA = require('../../nhtsa');

// Promise example of #getSaeWmisForManufacturer()
NHTSA.getSaeWmisForManufacturer('audi').then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
