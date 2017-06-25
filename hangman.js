
function load_words(wordString) {
  return wordString.split(" ");
}

function choose_word(wordArray) {
  /*
  wordlist (list): list of words (strings)
  Returns a word from wordlist at random
  */
  return wordArray[Math.floor(Math.random() * wordArray.length)];
}

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


  // secret_word: string, the word the user is guessing
  // letters_guessed: list (of letters), which letters have been guessed so far
  // returns: string, comprised of letters, underscores (_), and spaces that
  // represents which letters in secret_word have been guessed so far.
function get_guessed_word(secret_word, letters_guessed) {
  var dash_word = '';
  for (let x = 0; x < secret_word.length; x++) {
    if (letters_guessed.indexOf(secret_word[x]) > -1) {
      dash_word += secret_word[x]
    } else {
      dash_word += '_ ';
    }
  }
  return dash_word;
}


    // letters_guessed: list (of letters), which letters have been guessed so far
    // returns: string (of letters), comprised of letters that represents which
    // letters have not yet been guessed.
function get_available_letters(letters_guessed) {
  var not_guessed = '';
  var lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  for (let x = 0; x < lowerLetters.length; x++) {
    if (letters_guessed.indexOf(lowerLetters[x]) === -1) {
      not_guessed += lowerLetters[x];
    }
  }
  return not_guessed;
}