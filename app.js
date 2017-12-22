// Load the list of words from a separate words.json file.
let wordList = [];
function load() {
	$.getJSON("words.json", (result) => {
    wordList = result.words;
  });
}