# nhsta [![CircleCI](https://circleci.com/gh/iMears/nhtsa.svg?style=svg)](https://circleci.com/gh/iMears/nhtsa)
A NPM package for fetching and parsing vehicle data from the [NHTSA Vehicle API](https://vpic.nhtsa.dot.gov/api/Home)

## Basic usage
```javascript
const NHTSA = require('nhtsa');

// Example using async/await
(async () => {
  const { data } = await NHTSA.decodeVin('WUAAU34248N006164');

  console.log(data);
})();

// Example using a promise
NHTSA.decodeVin('WUAAU34248N006164').then(
  ({ data }) => console.log(data),
  error => console.log(error)
);
```

[Try it out](https://npm.runkit.com/nhtsa) in your browser!
