
function load_words(wordString) {
  return wordString.split(" ");
}

//debug / test
//console.log(load_words(wordList));

function choose_word(wordArray) {
  /*
  wordlist (list): list of words (strings)
  Returns a word from wordlist at random
  */
  return wordArray[Math.floor(Math.random() * wordArray.length)];
}

//test
// console.log(choose_word(load_words(wordList)));

const secret_word = choose_word(load_words(wordList)));

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
  let secret_word = secret_word.split("");
  let letters_guessed = letters_guessed.split("");
  for letter in secret_word:
      if letter not in letters_guessed:
          return False
  return True
}
