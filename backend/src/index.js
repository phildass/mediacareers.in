// backend/src/index.js
// Minimal, safe Express app for the backend entrypoint.
// Exports an Express `app` so other entry files can listen on it,
// and also starts a fallback server if this file is run directly.

const express = require('express');
const path = require('path');

const app = express();

// Basic health endpoint used by Render / monitoring and local checks
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Best-effort: try to load optional routes or middleware from ./routes
// If ./routes doesn't exist, ignore the error.
try {
  const routes = require(path.join(__dirname, 'routes'));
  if (typeof routes === 'function') {
    routes(app);
  }
} catch (e) {
  // ignore missing or broken routes module
  // console.debug('No routes loaded from ./routes (optional).');
}

// Export the app so callers (e.g. backend/server.js) can listen on it
module.exports = app;

// If the file is executed directly (node backend/src/index.js), start a fallback server.
if (require.main === module) {
  const port = process.env.PORT || 3000;
  const host = '0.0.0.0';
  app.listen(port, host, () => {
    console.log(`Fallback server listening on http://${host}:${port}`);
  });
}