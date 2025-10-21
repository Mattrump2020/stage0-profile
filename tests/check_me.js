/**
 * tests/check_me.js
 *
 * Usage:
 *   SERVER_URL=http://localhost:3000 node tests/check_me.js
 *   (defaults to http://localhost:3000 if SERVER_URL not provided)
 *
 * Exits with code 0 on success, non-zero on failure.
 *
 * Node 18+ required for global fetch. For older Node, install node-fetch and
 * run with a loader or modify script to import it.
 */

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const TIME_TOLERANCE_SECONDS = parseInt(process.env.TIME_TOLERANCE_SECONDS || '10', 10);

function fail(msg) {
  console.error('❌ TEST FAILED:', msg);
  process.exit(1);
}

function ok(msg) {
  console.log('✅', msg);
}

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function isIso8601(s) {
  if (!isNonEmptyString(s)) return false;
  const t = Date.parse(s);
  return !Number.isNaN(t);
}

(async () => {
  const url = `${SERVER_URL.replace(/\/+$/, '')}/me`;
  console.log(`Testing ${url}`);

  let resp;
  try {
    resp = await fetch(url, { method: 'GET' });
  } catch (err) {
    fail(`Network error when fetching ${url}: ${err.message || err}`);
  }

  if (resp.status !== 200) {
    fail(`Expected HTTP status 200 but received ${resp.status}`);
  }
  ok('HTTP status is 200');

  const contentType = resp.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    fail(`Expected Content-Type to include application/json but got "${contentType}"`);
  }
  ok(`Content-Type includes application/json ("${contentType}")`);

  let body;
  try {
    body = await resp.json();
  } catch (err) {
    fail(`Response body is not valid JSON: ${err.message || err}`);
  }
  ok('Response body parsed as JSON');

  const topKeys = Object.keys(body).sort();
  const expectedTopKeys = ['fact', 'status', 'timestamp', 'user'].sort();
  if (topKeys.length !== expectedTopKeys.length || !expectedTopKeys.every((k, i) => k === topKeys[i])) {
    fail(`Response JSON must contain exactly these top-level keys: ${expectedTopKeys.join(', ')}; got: ${topKeys.join(', ')}`);
  }
  ok('Top-level keys are correct');

  if (body.status !== 'success') {
    fail(`"status" must be the string "success"; got: ${JSON.stringify(body.status)}`);
  }
  ok('"status" is "success"');

  if (typeof body.user !== 'object' || body.user === null || Array.isArray(body.user)) {
    fail('"user" must be an object with keys email, name, stack');
  }
  const { email, name, stack } = body.user;
  if (!isNonEmptyString(email)) fail('"user.email" must be a non-empty string');
  if (!isNonEmptyString(name)) fail('"user.name" must be a non-empty string');
  if (!isNonEmptyString(stack)) fail('"user.stack" must be a non-empty string');
  ok('"user" contains email, name, stack as non-empty strings');

  if (!isIso8601(body.timestamp)) {
    fail(`"timestamp" must be a valid ISO 8601 string; got: ${JSON.stringify(body.timestamp)}`);
  }
  const tsMillis = Date.parse(body.timestamp);
  const nowMillis = Date.now();
  const diffSeconds = Math.abs(nowMillis - tsMillis) / 1000;
  if (diffSeconds > TIME_TOLERANCE_SECONDS) {
    fail(`"timestamp" differs from current UTC time by ${diffSeconds.toFixed(1)}s which is greater than allowed ${TIME_TOLERANCE_SECONDS}s`);
  }
  ok(`"timestamp" is ISO 8601 and within ${TIME_TOLERANCE_SECONDS}s of current time`);

  if (!isNonEmptyString(body.fact)) {
    fail('"fact" must be a non-empty string');
  }
  ok('"fact" is a non-empty string');

  console.log('\nAll tests passed ✅');
  console.log(`Details: status="success", user.email="${email}", user.name="${name}", user.stack="${stack}"`);
  console.log(`timestamp="${body.timestamp}", fact="${body.fact.substring(0, 120)}${body.fact.length > 120 ? '...' : ''}"`);
  process.exit(0);
})();
