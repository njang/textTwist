// Load the list of words from a separate words.json file.
// Filter out words that are too short or too long.
let wordList = [];
$(document).ready(function() {
	let minLength = 3;	// minimum string length of word
	let maxLength = 6;	// maximum string length of word
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
	// let letters = randomWord.split('').sort();
	permutations = Array.from(new Set(getAllPermutations(randomWord))).filter(word => wordList.indexOf(word) > 0);
	// let permuWords = permutations.filter(word => wordList.indexOf(word) > 0);
	// console.log(permuWords);
	console.log(permutations);
}

function getAllPermutations(string) {
  var results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (var i = 0; i < string.length; i++) {
    var firstChar = string[i];
    var charsLeft = string.substring(0, i) + string.substring(i + 1);
    var innerPermutations = getAllPermutations(charsLeft);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

function swap(chars, i, j) {
    var tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
}

function getAnagrams(input) {
    var counter = [],
        anagrams = [],
        chars = input.split(''),
        length = chars.length,
        i;

    for (i = 0; i < length; i++) {
        counter[i] = 0;
    }

    anagrams.push(input);
    i = 0;
    while (i < length) {
        if (counter[i] < i) {
            swap(chars, i % 2 === 1 ? counter[i] : 0, i);
            counter[i]++;
            i = 0;
            anagrams.push(chars.join(''));
        } else {
            counter[i] = 0;
            i++;
        }
    }

    return anagrams;
}