const nhtsa = require('nhtsa');

// Promise example of #getSaeWmisForManufacturer(manufacturer, format)
nhtsa.getSaeWmisForManufacturer('audi').then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
