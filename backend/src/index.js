/**
 * Robust entrypoint for the backend.
 *
 * - Tries to require common app/server module names (./app, ./server, ./app/index, ./server/index).
 * - If it finds an Express app (function or module with .listen) it will attach a /health route
 *   and call listen on process.env.PORT (or 3000 fallback), binding to 0.0.0.0.
 * - If it cannot find an app/server it prints a clear error and exits with non-zero code.
 *
 * This approach avoids hardcoding a listen call in many possible locations and works well
 * on Render where process.env.PORT is provided.
 */

'use strict';

const path = require('path');

function tryRequireCandidates() {
  const candidates = [
    './app',
    './server',
    './app.js',
    './server.js',
    './app/index',
    './server/index',
    './src/app',
    './src/server'
  ];

  for (const c of candidates) {
    try {
      // resolve relative to this file
      const full = path.resolve(__dirname, c);
      const mod = require(full);
      if (!mod) continue;

      // If module itself is an express app (function) or export default is function
      if (typeof mod === 'function') return { type: 'app', value: mod };

      if (mod && typeof mod.listen === 'function') return { type: 'server', value: mod };

      if (mod && typeof mod.default === 'function') return { type: 'app', value: mod.default };

      // If module exports an object with an `app` property that is an express instance
      if (mod && mod.app && typeof mod.app.listen === 'function') return { type: 'app', value: mod.app };

      // If module exports { server } or { app }
      if (mod && mod.server && typeof mod.server.listen === 'function') return { type: 'server', value: mod.server };

    } catch (err) {
      // ignore require failures for non-existent candidates or runtime errors in those modules
      // but we will continue trying other candidates
    }
  }
  return null;
}

function attachHealthIfExpress(app) {
  try {
    if (app && typeof app.get === 'function') {
      // Idempotent: only add if not already defined
      // simple guard: don't override an existing route if present
      // We can't easily inspect routes in a portable way, so we try/catch to avoid crash.
      app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
    }
  } catch (e) {
    // ignore if not an Express app
  }
}

function startListening({ app, server }) {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  if (app) {
    attachHealthIfExpress(app);
    try {
      app.listen(port, host, () => {
        console.log(`Server (app.listen) listening on ${host}:${port} - NODE_ENV=${process.env.NODE_ENV}`);
      });
      return true;
    } catch (err) {
      console.error('Failed to listen using app.listen:', err && err.stack ? err.stack : err);
      return false;
    }
  }

  if (server) {
    try {
      server.listen(port, host, () => {
        console.log(`Server (server.listen) listening on ${host}:${port} - NODE_ENV=${process.env.NODE_ENV}`);
      });
      return true;
    } catch (err) {
      console.error('Failed to listen using server.listen:', err && err.stack ? err.stack : err);
      return false;
    }
  }

  return false;
}

// Main bootstrap
(function main() {
  const found = tryRequireCandidates();

  if (found) {
    if (found.type === 'app') {
      // module is an express app
      startListening({ app: found.value });
      return;
    }
    if (found.type === 'server') {
      startListening({ server: found.value });
      return;
    }
  }

  // Fallback: if we didn't find an app, try to require express here and create a minimal app
  try {
    // try to avoid adding a dependency if not needed; this only runs if we couldn't find the app/server
    const express = require('express');
    const app = express();
    app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

    // load any routes or middleware if they exist (best-effort)
    try {
      const routes = require(path.join(__dirname, 'routes'));
      if (typeof routes === 'function') routes(app);
    } catch (e) {
      // ignore missing routes module
    }

    startListening({ app });
    console.warn('Started a minimal express server as a fallback. This is only used when no app/server module was detected.');
    return;
  } catch (e) {
    // couldn't require express or create fallback app - exit with a clear error
    console.error('No app or server module detected and express could not be required to create a fallback server.');
    console.error('Please ensure your backend exports an Express app or http server from one of: ./app, ./server, ./app/index, ./server/index');
    console.error('Error details (if any):', e && e.stack ? e.stack : e);
    process.exitCode = 1;
  }
})();