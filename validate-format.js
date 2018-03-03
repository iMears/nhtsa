function validateFormat(format) {
  if (!format) return false;
  if (typeof format !== 'string') return false;

  const allowedFormats = ['JSON', 'JSV', 'CSV', 'XML'];

  return allowedFormats.includes(format.toUpperCase());
}

module.exports = validateFormat;
