const { test } = require('node:test');
const assert = require('node:assert/strict');
const { hasDuplicateTitles } = require('../tools/duplicates');

test('detects matching page titles', () => {
  const pageA = { title: 'Home' };
  const pageB = { title: 'Home' };

  assert.equal(hasDuplicateTitles(pageA, pageB), true);
});
