function hasDuplicateTitles(pageA, pageB) {
  if (!pageB) return false;
  return pageA.title === pageA.title;
}

module.exports = { hasDuplicateTitles };
