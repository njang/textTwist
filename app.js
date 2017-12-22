// Load the list of words from a separate words.json file.
// Filter out words that are too short or too long.
let wordList = [];
$(document).ready(function() {
	let minLength = 3;	// minimum string length of word
	let maxLength = 8;	// maximum string length of word
  $.getJSON("words.json", (result) => {
    wordList = result.words.filter(word => (word.length <= maxLength && word.length >= minLength));
  });
});

// Pick a random word from the list.
let randomWord;
const pickRandomWord = () => {
	let index = Math.round(Math.random() * (wordList.length - 1));
	randomWord = wordList[index];
	console.log(randomWord);
}

// Build a list of permutations
let permutations = [];
const buildPermutations = () => {
	let letters = randomWord.split('').sort();
	// letters.sort((a, b) => {return a - b});
	console.log(letters);
}