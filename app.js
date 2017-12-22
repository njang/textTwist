// Load the list of words from a separate words.json file.
// Filter out words that are too short or too long.

let wordList = [];
$(document).ready(function() {
	let minLength = 4;	// minimum string length of word
	let maxLength = 6;	// maximum string length of word
	wordList = dictionary.words.filter(word => (word.length <= maxLength && word.length >= minLength));
  // $.getJSON("words.json", (result) => {
  //   wordList = result.words.filter(word => (word.length <= maxLength && word.length >= minLength));
  // });
});

// Pick a random word from the list.
let randomWord;
const pickRandomWord = () => {
	let index = Math.round(Math.random() * (wordList.length - 1));
	randomWord = wordList[index];
}

// Build a list of permutations that are words included in the original list.
let permutations = [];
let permuWords = [];
const buildPermutations = () => {
	permutations = Array.from(new Set(getAllPermutations(randomWord)));
	permuWords = permutations.filter(word => wordList.indexOf(word) > 0);
	
	permuWords.sort((a, b) => {
		return a.length - b.length;
	});
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

const main = () => {
	// Reset button will reset the word.
	$('#reset').click(function(){
		pickRandomWord();
		buildPermutations();	
		$("#hint").text(randomWord);
		$('#words').text(permuWords);
	});

	// Twist button will scramble the word.
	// let temp = permutations.filter(word => word.length == randomWord.length);		
	$('#twist').click(function(){
		let randomIndex = Math.round(Math.random() * (permutations.length - 1));
		let randomWord = permutations[randomIndex];
	// 	$('#hint').text(randomNonWord);
		$('#hint').text(randomWord);		
	});
}

$(document).ready(main);