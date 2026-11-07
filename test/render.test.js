const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { renderPage, main } = require('../tools/build.js');

test('renderPage converts heading to h1', () => {
  const html = renderPage('# Hello World', 'Test Page');
  assert.ok(html.includes('<h1>Hello World</h1>'));
});

test('renderPage uses the supplied title', () => {
  const html = renderPage('# Hello', 'My Custom Title');
  assert.ok(html.includes('<title>My Custom Title</title>'));
});

test('main returns usage exit code 2 when arguments are missing', () => {
  const code = main([]);
  assert.equal(code, 2);
});

test('main writes output to a temporary directory', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-test-'));
  const src = path.join(tempDir, 'input.md');
  const dest = path.join(tempDir, 'output', 'page.html');

  fs.writeFileSync(src, '# Temporary Page');

  const code = main([src, dest]);

  assert.equal(code, 0);
  assert.ok(fs.existsSync(dest));

  const html = fs.readFileSync(dest, 'utf8');
  assert.ok(html.includes('<h1>Temporary Page</h1>'));
});
