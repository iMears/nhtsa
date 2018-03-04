function validateVIN(vin) {
  vin = vin.toLowerCase();

  if (!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/.test(vin)) {
    return false;
  }

  const transliterationTable = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
    '9': 9, 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'p': 7, 'r': 9, 's': 2, 't': 3,
    'u': 4, 'v': 5, 'w': 6, 'x': 7, 'y': 8, 'z': 9
  };

  const weightsTable = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;

  for (let i = 0; i < vin.length; ++i) {
    sum += transliterationTable[vin.charAt(i)] * weightsTable[i];
  }

  const mod = sum % 11;

  return mod === 10 ? vin.charAt(8) === 'x' : vin.charAt(8) == mod;
}

module.exports = validateVIN;
