const { test } = require('node:test');
const assert = require('node:assert/strict');
const { hasDuplicateTitles } = require('../tools/duplicates');

test('detects matching page titles', () => {
  const pageA = { title: 'Home' };
  const pageB = { title: 'Home' };

  assert.equal(hasDuplicateTitles(pageA, pageB), true);
});

test('returns false when page titles are different', () => {
  const pageA = { title: 'Home' };
  const pageB = { title: 'About' };

  assert.equal(hasDuplicateTitles(pageA, pageB), false);
});

test('returns false when second page is missing', () => {
  const pageA = { title: 'Home' };

  assert.equal(hasDuplicateTitles(pageA, null), false);
});
