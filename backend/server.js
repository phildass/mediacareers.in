// backend/server.js
// Try to use an exported app from ../app or ./src. If an Express app is exported,
// call listen() here. Otherwise, delegate to ./src which may start itself.

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

function isExpressApp(m) {
  return m && typeof m.listen === 'function' && typeof m.use === 'function';
}

function tryListen(app, label) {
  app.listen(port, host, () => {
    console.log(`${label} listening on http://${host}:${port}`);
  });
}

// 1) Try top-level app (../app -> ../app/index.js)
try {
  let maybeApp = null;
  try {
    maybeApp = require('../app'); // resolves to ../app/index.js if present
  } catch (e) {
    maybeApp = null;
  }

  if (isExpressApp(maybeApp)) {
    tryListen(maybeApp, 'Server (from ../app)');
    return;
  }

  // some modules export { app }
  if (maybeApp && isExpressApp(maybeApp.app)) {
    tryListen(maybeApp.app, 'Server (from ../app.app)');
    return;
  }
} catch (e) {
  // ignore and fall through to ./src
}

// 2) Fallback: require backend/src which may export an app or start itself.
// Capture the exported value and, if it exports an Express app, listen on it.
// Otherwise assume ./src started (or will throw a clear error).
try {
  const srcModule = require('./src');

  // If ./src exported an express app, listen on it
  if (isExpressApp(srcModule)) {
    tryListen(srcModule, 'Server (from ./src)');
    return;
  }

  // Or if ./src exported an object { app: <express app> }
  if (srcModule && isExpressApp(srcModule.app)) {
    tryListen(srcModule.app, 'Server (from ./src.app)');
    return;
  }

  // ./src loaded successfully and either started the server itself, or
  // contains its own startup logic — proceed assuming it handled startup.
  console.log('Started via ./src (module loaded). If ./src starts the server it will have logged output above.');
} catch (err) {
  console.error('Failed to start the server via known entry points (../app or ./src):', err && err.stack ? err.stack : err);
  process.exit(1);
}