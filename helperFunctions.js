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
  for (let letter of secret_word) {
    if (letters_guessed.indexOf(letter) === -1) {
      return false;
    }
  }
  return true;
}


function get_guessed_word(secret_word, letters_guessed) {
  /* 
    secret_word: string, the word the user is guessing
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string, comprised of letters, underscores (_), and spaces that
    represents which letters in secret_word have been guessed so far.
  */
  var dash_word = '';
  for (let letter of secret_word) {
    if (letters_guessed.indexOf(letter) > -1) {
      dash_word += letter;
    } else {
      dash_word += '_ ';
    }
  }
  return dash_word;
}


function get_available_letters(letters_guessed) {
    /*
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string (of letters), comprised of letters that represents which
    letters have not yet been guessed.
    */
  var not_guessed = '';
	for (let letter of lowerLetters) {
    if (letters_guessed.indexOf(letter) === -1) {
      not_guessed += letter;
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
  var userGuess = prompt('Please guess a letter: ')
  if (userGuess === null) return -1;
  userGuess = userGuess.toLowerCase();
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


function num_unique_letters(secret_word) {
  /*
  Given a secret_word, the number of unique letters is returned.
  FYI:
  The total score is the number of  guesses_remaining  once the user has
  guessed the  secret_word  times the number of unique letters in  secret_word.
  */
  var count = 0;
  var unique = [];
  for (let letter of secret_word) {
    if (unique.indexOf(letter) === -1) {
      unique.push(letter);
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
  for (let letter of word) {
    if (letter !== '_' && !wordCount.hasOwnProperty(letter)) {
      wordCount[letter] = 1;
    } else if (letter !== '_' && wordCount.hasOwnProperty(letter)) {
      wordCount[letter] += 1;
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
  
  my_word = removeSpaces(my_word);
  other_word = removeSpaces(other_word);
  
  for (let [i, letter] of Array.from(my_word).entries()) {
    if (!matchLetter(letter, other_word[i])) {
      return false;
      }
    }
    var myTally = letterTally(my_word);
    var otherTally = letterTally(other_word);
    var item;
    for (item in myTally) {
      if (otherTally[item] !== myTally[item]) {
      return false;
      }
    }
    return true;
  }


function show_possible_matches(my_word) {
  /*
    my_word: string with _ characters, current guess of secret word
    returns: nothing, but should print out every word in wordlist that matches my_word
             Keep in mind that in hangman when a letter is guessed, all the positions
             at which that letter occurs in the secret word are revealed.
             Therefore, the hidden letter(_ ) cannot be one of the letters in the word
             that has already been revealed.
  */
  my_word = removeSpaces(my_word);
  //caution: wordArray is global and myList is an array
  var myList = reduceList(wordArray, my_word.length);
  var possible_matches = [];
  for (let i = 0; i < myList.length; i++) {
    if (match_with_gaps(my_word, myList[i])) {
      possible_matches.push(myList[i]);
    }
  }

  if (possible_matches.length > 0) {
    var matchesOutput = 'Possible word matches are: \n';
    for (let i = 0; i < possible_matches.length; i++) {
      //prints matches in one line
      matchesOutput += possible_matches[i] + ' ';
    }
    alert(matchesOutput);
  } else console.log('No matches found');
}
