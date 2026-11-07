// Compare the titles of two pages.
function hasDuplicateTitles(pageA, pageB) {
  if (!pageB) return false;
  return pageA.title === pageB.title;
}

module.exports = { hasDuplicateTitles };
