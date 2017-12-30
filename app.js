
// Load the list of words from a separate words.json file.
// Filter out words hat are too short or too long.
let collection = [];
// let commonList = [];
$(document).ready(function() {
	let minLength = 3;	// minimum string length of word
	let maxLength = 6;	// maximum string length of word
	collection = dictionary.words.filter(word => (word.length <= maxLength && word.length >= minLength));
	// commonList = common.words.filter(word => (word.length <= maxLength && word.length >= minLength));
  // $.getJSON("words.json", (result) => {
  //   collection = result.words.filter(word => (word.length <= maxLength && word.length >= minLength));
  // });
  resetGame();
});

// Pick a random word from the list.
let randomWord;
const pickRandomWord = () => {
	let index = Math.round(Math.random() * (collection.length - 1));
	randomWord = collection[index];
};

// Build a list of permutations using the letters of the random word.
// Filter it to a list of real words.
let permutations = [];
let wordList = [];
const buildPermutations = () => {
	permutations = Array.from(new Set(getAllPermutations(randomWord)));
	wordList = permutations.filter(word => collection.indexOf(word) >= 0);
	wordList.sort((a, b) => {
		return a.length - b.length;
	});
};

// Function to return all permutations of a given string. 
// Reference: https://repl.it/repls/TwinPrudentIbizanhound
const getAllPermutations = (string) => {
  let results = [];
  // If the string consists of one character, return it.
  if (string.length === 1) {
    results.push(string);
    return results;
  }
  // recursive function to get all permutations.
  for (let i = 0; i < string.length; i++) {
    let firstChar = string[i];
    let charsLeft = string.substring(0, i) + string.substring(i + 1);
    let innerPermutations = getAllPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j], innerPermutations[j]);
    	// The following line strictly uses permutations of the same length as the original word.
      // results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

// Function to check whether guess word is in the list
const isWord = (word) => {
	return (wordList.indexOf(word) >= 0);
}

// Scramble the hint word.
let scrambleWord = () => {
	let scrambled = permutations.filter(word => (word.length == randomWord.length) && (word != randomWord));
	let index = Math.round(Math.random() * (scrambled.length - 1))
	$("#twisted").text(scrambled[index]);
	// $('#words').text(wordList);
}

// Twist button will scramble the word
$('#twist').click(() => {
	scrambleWord();		
});

// Reset button will reset the word
$('#reset').click(() => {
	resetGame();
});

// Function to reset/initialize the game.
const resetGame = () => {
	// Set a threshold on the number of premutated words.
	let maxWords = 25;
	pickRandomWord();
	buildPermutations();	
	// Word list shouldn't contain more than maximum allowed, as defined above, but must have at least 1 minimum.
	if (wordList.length > maxWords || wordList.length == 1) {
		resetGame();
	}
	// Empty the guess list.
	correctGuesses = [];
	// Display the random word selected for this round.
	$("#twisted").text(randomWord);
	// Empty the guesses displayed from previous round.
	$('#words').text('');
	// Reset the placeholder text for the entry form.
	$('#guess').attr("placeholder", "Enter text here");
	// Enable the entry form, which was disabled at the end of the previous game.
	$('#guess').attr("disabled", false);
	// Scramble the hint word.
	scrambleWord();
}

// Function to collect correctly guessed words.
let correctGuesses = [];
// On submit of a guess word, check if it is in the list of permutated words.
$('#submit').click((event) => {
	event.preventDefault();
	let guessWord = $("#guess").val();
	if (wordList.indexOf(guessWord) >= 0 && correctGuesses.indexOf(guessWord) < 0) {
		correctGuesses.push(guessWord);
		correctGuesses.sort(function(a, b){return a.length - b.length || a.localeCompare(b)});
		$('#words').text(correctGuesses.join(', '));
		
		// If the player guesses the correct word, display congratulation message.
		if (guessWord == randomWord) {
			alert('Congratulations, you found the word!');
		}			
		// if the player finds all the words, display another congratulation message.
		if (correctGuesses.length < wordList.length) {
			$('#guess').attr("placeholder", wordList.length - correctGuesses.length + " words remaining");
		} else {
			alert('Congratulations, you found all the words!');
			$('#guess').attr("placeholder", "Round complete");
			$('#guess').attr("disabled", true);
		}
	}
	// Clear the text entry box.
	$("#guess").val('');
});

// Assign space key for scrambling the letters.
document.addEventListener('keyup', (event) => {
	if (event.code === "Space") {
		scrambleWord();
		$('#guess').val($('#guess').val().replace(/ /g,''));
		// return false; // return false to prevent space from being added		
	}
})