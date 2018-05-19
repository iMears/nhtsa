const nhtsa = require('nhtsa');
const type = 565;
const page = 1;
const format = 'CSV';

let toDate = new Date();
let fromDate = new Date();

fromDate.setMonth(toDate.getMonth() - 1);

toDate = toDate.toLocaleDateString('en-US'); // '3/3/2018';
fromDate = fromDate.toLocaleDateString('en-US'); // '2/3/2018';

// Promise example of #getParts(type, fromDate, toDate, page, format)
nhtsa.getParts(type, fromDate, toDate, page, format).then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
