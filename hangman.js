const lowerLetters = "abcdefghijklmnopqrstuvwxyz";

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
  for (let x = 0; x < lowerLetters.length; x++) {
    if (letters_guessed.indexOf(lowerLetters[x]) === -1) {
      not_guessed += lowerLetters[x];
    }
  }
  return not_guessed;
}


// ===MORE HELPER FUNCTIONS===
function get_user_guess() {
  /*
  gets user input. checks if length == 1 and if in alphabet.
  returns -1 if invalid. returns userGuess otherwise.
  ADDITIONS: if userGuess == '*' then it's returned.
  */
  var userGuess = prompt('Please guess a letter: ').toLowerCase();
  if (userGuess.length !== 1) return -1;
  if (userGuess === '*') return userGuess;
  if (lowerLetters.indexOf(userGuess) === -1) return -1;
  return userGuess;  
}

function display_num_warnings(warnings) {
  /*
  Given a number of warnings, a properly formatted display is printed.
  */
  if (warnings > 1 || warnings == 0) {
    console.log('You have ', warnings, ' warnings left: ');
  } else if (warnings == 1) {
    console.log('You have ', warnings, ' warning left: ');
  } else {
    console.log('You have no warnings left so you lose one guess: ')
  }
}

function penalty(warnings) {
  /*
  Given a number of warnings, a penalty is assessed.
  */
  if (warnings < 0) return true;
}

//The total score is the number of  guesses_remaining  once the user has
//guessed the  secret_word  times the number of unique letters in  secret_word .
function num_unique_letters(secret_word) {
  //Given a secret_word, the number of unique letters is returned.
  var count = 0;
  var unique = [];
  for (var i = 0; i<secret_word.length; i++) {
    if (unique.indexOf(secret_word[i]) === -1) {
      unique.push(secret_word[i]);
      count += 1;
    }
  }
  return count;
}

// ===HELPER FUNCTIONS FOR HANGMAN WITH HINTS
function reduceList(myList, num) {
  /*
  Given a long list of words and num (length of word), a list of words on with
  num length is returned.
  */
  return myList.filter(word => (word.length === num));
}

function matchLetter(letter1, letter2) {
  /*
  given two letters, functions returns true if they match (or the first letter
  is '_') and returns false otherwise.
  */
  letter1 = letter1.toLowerCase();
  if (letter1 === letter2) return true;
  else if (letter1 === '_') return true;
  else return false;
}


function letterTally(word) {
  /*
  Given a string (word), a dict which counts letters
  in form of {'a':1, 'b':2} is returned.
  */
  var wordCount = {};
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== '_' && !wordCount.hasOwnProperty(word[i])) {
      wordCount[word[i]] = 1;
    } else if (word[i] !== '_' && wordCount.hasOwnProperty(word[i])) {
      wordCount[word[i]] += 1;
    }
  }
  return wordCount;
}


function removeSpaces(word) {
//  Given a string (word), a string is returned with all spaces removed.
  return word.replace(/ /g, '');
}


function removeUnderscores(word) {
  /*
  Given a string (word), all spaces are removed per removeSpaces, all '_' are
  removed and the string is returned.
  */
  word = removeSpaces(word);
  return word.replace(/_/g, '');
}


function match_with_gaps(my_word, other_word) {
  /*
  my_word: string with _ characters, current guess of secret word
  other_word: string, regular English word
  returns: boolean, True if all the actual letters of my_word match the
      corresponding letters of other_word, or the letter is the special symbol
      _ , and my_word and other_word are of the same length;
      False otherwise:
  */
  my_word = removeSpaces(my_word);
  other_word = removeSpaces(other_word);
  
  for (let i = 0; i < my_word.length; i++) {
    if (!matchLetter(my_word[i], other_word[i])) {
      return false;
    }
  }
  
  

}
/*
def match_with_gaps(my_word, other_word):
    '''
    my_word: string with _ characters, current guess of secret word
    other_word: string, regular English word
    returns: boolean, True if all the actual letters of my_word match the
        corresponding letters of other_word, or the letter is the special symbol
        _ , and my_word and other_word are of the same length;
        False otherwise:
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    my_word = removeSpaces(my_word)
    other_word = removeSpaces(other_word)

    for i, letter in enumerate(my_word):
        if not matchLetter(my_word[i], other_word[i]):
            return False

    #This function checks if the letterTally in my_word is found in other_word.
        #Why? if the letters aren't found and the counts are not the same,
        #the word is not a possible match.
    # https://stackoverflow.com/questions/9323749/python-check-if-one-dictionary-is-a-subset-of-another-larger-dictionary/41579450#41579450
    if not letterTally(my_word).items() <= letterTally(other_word).items():
        return False

    return True
*/