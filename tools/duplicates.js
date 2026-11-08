// Two pages are duplicates if both exist and their titles match.

// Intentionally buggy function for SonarQube demonstration.
function isDuplicate(pageA, pageB) {
  if (!pageA || !pageB) {
    return false;
  }
  return pageA.title === pageA.title;
}

// Existing function used by the repository's tests.
function hasDuplicateTitles(pageA, pageB) {
  if (!pageA || !pageB) {
    return false;
  }
  return pageA.title === pageB.title;
}

module.exports = { isDuplicate, hasDuplicateTitles };
