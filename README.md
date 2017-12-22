# Text Twist

## Description
Text twist is a word game, where the player guesses the right word by correcting the order of letters that are mixed up. For example, a word "GATHER" is presented to the player by "RTEAGH". The player can guess other shorter words made up of the letters A, E, G, H, R, and T, such as "GET", "HEAR" or "HEART". Each round is complete when the player correctly guesses all permutations of the letters that are words. 

## Two User Personas
- 38 year old English professor after the completion of academic year teaching an introductory freshmen class
- 5 year old child who just started learning how to spell words

## User stories for Minimum Viable Product (MVP)
- As a player, user can start a game where a random word is presented with letter order mixed up.
- As a player, user can make guesses by using the individual letters.
- As a player, user can see the list of correctly guessed words.

## User stories for stretch goals
 - User can mix up the presented order of letters to further examine other possible words.
 - Each word is assigned different score, based on their string length. Player collects these points.
 - The letters are shown in [split-flap display](https://en.wikipedia.org/wiki/Split-flap_display).
 - The game is timed, where if the player finishes the game, the more points they earn.
 - The list of words are limited to locally stored database (currently 10,000 words)
 
## A wireframe for the project 
![](/images/wireframe.png)

## Challenges

### Finding list of words

Useful if you're creating a word game or just want some words to work with: [word-list-json](https://www.npmjs.com/package/word-list-json)

> wordlist is sorted by length, in addition to the usual length property the array also has a 'lengths' property which is a dict with keys of word lengths and values which are the array index after the last word of that length e.g. what the array length would be if it had no words with a longer length.

### Storing the list of words in a separate file and importing it

Chrome browser will give the following error, when a separate JSON file is requested from the JS file.

> Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
a simple guide for getting a local web server set up

During the development stage, localhost is used to get around this issue: 
- [A simple guide for getting a local web server set up](https://gist.github.com/jgravois/5e73b56fa7756fd00b89)

### Filtering out words that are too long

For the practical concern of this project, the words consisting of more than 8 letters will not be used. At a later time after the logic has been proven to function, this limit may be relaxed to include words that are longer.

### Random word selector

Random number generator will be used to pick an index of the word in the list. 

### Building a list of all 'sub'-words

Once a random word has been picked, it has to be split down to componenet letters. These letters will be reassembled to build a list of permutations. This permutation will be validated against the original words list for whether such permutation is a recognized word.  
