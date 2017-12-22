// Load the list of words from a separate words.json file.
// Filter out words that are too short or too long.
let wordList = [];
$(document).ready(function() {
	let minLength = 3;	// minimum string length of word
	let maxLength = 5;	// maximum string length of word
  $.getJSON("words.json", (result) => {
    wordList = result.words.filter(word => (word.length <= maxLength && word.length >= minLength));
  });
});

// Pick a random word from the list.
let randomWord;
const pickRandomWord = () => {
	let index = Math.round(Math.random() * (wordList.length - 1));
	randomWord = wordList[index];
}

// Build a list of permutations that are words included in the original list.
let permutations = [];
const buildPermutations = () => {
	permutations = Array.from(new Set(getAllPermutations(randomWord))).filter(word => wordList.indexOf(word) > 0);
	permutations.sort();
}

const getAllPermutations = (string) => {
  let results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (let i = 0; i < string.length; i++) {
    let firstChar = string[i];
    let charsLeft = string.substring(0, i) + string.substring(i + 1);
    let innerPermutations = getAllPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j], innerPermutations[j]);
    }
  }
  return results;
}
