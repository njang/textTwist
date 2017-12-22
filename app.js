// Load the list of words from a separate words.json file.
// Filter out words that are too short or too long.
let wordList = [];
$(document).ready(function() {
	let minLength = 3;	// minimum string length of word
	let maxLength = 4;	// maximum string length of word
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

// Build a list of permutations using the letters of the random word.
// Filter it to a list of real words.
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

// Function to check whether guess word is in the list
const isWord = (word) => {
	return (permuWords.indexOf(word) >= 0);
}

// Initializes the game on load.
const init = () => {
	pickRandomWord();
	buildPermutations();	
	scrambleWord();
	// $('#words').text(permuWords);
}

// Scramble the hint word.

let scrambleWord = () => {
	let scrambled = permutations.filter(word => (word.length == randomWord.length) && (word != randomWord));
	let index = Math.round(Math.random() * (scrambled.length - 1))
	$("#hint").text(scrambled[index]);
}

// Function to collect correctly guessed words
let correctGuesses = [];


// Main app for the game
const main = () => {
	// Twist button will scramble the word.
	let temp = permutations.filter(word => word.length == randomWord.length);	
	$("#hint").text(temp[0]);
	$('#twist').click(() => {
		let randomIndex = Math.round(Math.random() * (permutations.length - 1));
		// let randomWord = permutations[randomIndex];
		let randomWord = temp[randomIndex];
	// 	$('#hint').text(randomNonWord);
		$('#hint').text(randomWord);		
	});

	// Reset button will reset the word.
	$('#reset').click(() => {
		pickRandomWord();
		buildPermutations();	
		$("#hint").text(randomWord);
		// correctGuesses = [];
		// $('#guess').val('');
	});

	// On submit of a guess word, check if it is in the list of permuted word.
	$('#submit').click((event) => {
		event.preventDefault();

		let guessWord = $("#guess").val();
		if (permuWords.indexOf(guessWord) >= 0 && correctGuesses.indexOf(guessWord) < 0) {
			correctGuesses.push(guessWord);
			$('#words').text(correctGuesses.join(', '));
			if (correctGuesses.length == permuWords.length) {
				alert('Congratulations, you win the internet!');
			}
		}


		// alert(`You entered ${$("#guess").val()} and ` + (isWord($("#guess").val()) ? "It's a word!" : "Try again"));
		// Clear out the text entry box
		$("#guess").val('');
	});
}

$(document).ready(main);
