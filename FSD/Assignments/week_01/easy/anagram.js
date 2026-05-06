/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(word1, word2) {
  // Remove spaces and convert to lowercase for case-insensitive comparison
  const cleanWord1 = word1.replace(/\s/g, '').toLowerCase();
  const cleanWord2 = word2.replace(/\s/g, '').toLowerCase();
  // Check if the sorted characters of both words are equal
  return cleanWord1.split('').sort().join('') === cleanWord2.split('').sort().join('');
}
module.exports = isAnagram;
