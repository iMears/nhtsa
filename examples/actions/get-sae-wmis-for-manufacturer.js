const NHTSA = require('nhtsa');

// Promise example of #getSaeWmisForManufacturer(manufacturer, format)
NHTSA.getSaeWmisForManufacturer('audi').then(
  ({ data }) => console.log(data),
  error => console.log(error)
);