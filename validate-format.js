function validateFormat(format) {
  const allowedFormats = ['json', 'jsv', 'csv', 'xml'];

  return allowedFormats.includes(format.toLowerCase());
}

module.exports = validateFormat;
