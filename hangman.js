
function load_words(wordString) {
  return wordString.split(" ");
}

//test
//console.log(load_words(wordList));
//passed

function choose_word(wordArray) {
  /*
  wordlist (list): list of words (strings)
  Returns a word from wordlist at random
  */
  return wordArray[Math.floor(Math.random() * wordArray.length)];
}

//test
// console.log(choose_word(load_words(wordList)));
//passed

let secret_word = choose_word(load_words(wordList));



function is_word_guessed(secret_word, letters_guessed) {
  /*
  secret_word: string, the word the user is guessing; assumes all letters are
    lowercase
  letters_guessed: list (of letters), which letters have been guessed so far;
    assumes that all letters are lowercase
  returns: boolean, True if all the letters of secret_word are in
  letters_guessed;
    False otherwise
  */
  secret_word = secret_word.split("");
  letters_guessed = letters_guessed.split("");
  for (let i = 0; i < secret_word.length; i++) {
    if (letters_guessed.indexOf(secret_word[i]) === -1) {
      return false;
    }
  }
  return true;
}

//test
// let letters_guessed = 'somethinklpg';
// console.log(is_word_guessed('something', letters_guessed));//true
// letters_guessed = 'somethinklp';//false
//passed
