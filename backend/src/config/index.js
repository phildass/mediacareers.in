// (suggested) robust test-mode detection
// ensure this file path matches your project (adjust path if needed)

const env = process.env;

function parseBool(value) {
  if (value === undefined || value === null) return false;
  const s = String(value).toLowerCase().trim();
  return s === '1' || s === 'true' || s === 'yes' || s === 'on';
}

const config = {
  // other config entries...
  testMode: parseBool(env.TEST_MODE) || env.NODE_ENV === 'test',
  // e.g.:
  // port: Number(env.PORT) || 3000,
  // ...
};

module.exports = config;