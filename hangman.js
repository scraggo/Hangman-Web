//Slowly translating from python.

function hangman_with_hints(secret_word) {
    /*
    secret_word: string, the secret word to guess.

    Starts up an interactive game of Hangman.

    * At the start of the game, let the user know how many
      letters the secret_word contains and how many guesses s/he starts with.

    * The user should start with 6 guesses

    * Before each round, you should display to the user how many guesses
      s/he has left and the letters that the user has not yet guessed.

    * Ask the user to supply one guess per round. Make sure to check that the user guesses a letter

    * The user should receive feedback immediately after each guess
      about whether their guess appears in the computer's word.

    * After each guess, you should display to the user the
      partially guessed word so far.

    * If the guess is the symbol *, print out all words in wordlist that
      matches the current guessed word.

    Follows the other limitations detailed in the problem write-up.
    */
    'use strict';
    console.log('Welcome to the game Hangman!');
    console.log('Type (*) for a hint.');
    console.log('I am thinking of a word that is ', secret_word.length, ' letters long.');
    console.log('------see-prompt-------');
    var guessNum = 6;
    var letters_guessed = '';
    var warnings = 3;
    var gameOn = true;
    while (gameOn)//need a variable?
       {
        console.log('You have ', guessNum, ' guesses left.');
        console.log('Available letters: ', get_available_letters(letters_guessed));

        var userGuess = get_user_guess(); //function returns -1 if invalid;
        console.log(userGuess);//debug

        if (userGuess === -1) {
            warnings -= 1;
            console.log('Oops! That is not a valid letter. ');
            display_num_warnings(warnings);
            if (penalty(warnings)) {
                guessNum -= 1;
            }
        } else if (userGuess === '*') {
            show_possible_matches(get_guessed_word(secret_word, letters_guessed));
        } else if (letters_guessed.indexOf(userGuess) !== -1) {
            warnings -= 1;
            console.log('Oops! You\'ve already guessed that letter. ');
            display_num_warnings(warnings);
            if (penalty(warnings)) {
                guessNum -= 1;
            }
        } else {
            letters_guessed += userGuess;

            if (secret_word.indexOf(userGuess) !== -1) {
                console.log('Good guess! ');
            } else {
                console.log('Oops! That letter is not in my word: ');
                if ('aeiou'.indexOf(userGuess) !== -1) {//Vowels lose 2 guesses!
                    guessNum -= 2;
                } else {
                    guessNum -= 1;
                    }
            }
        }
        console.log(get_guessed_word(secret_word, letters_guessed));
        console.log('------see-prompt-------');

        if (is_word_guessed(secret_word, letters_guessed)) {
            var score = (guessNum) * num_unique_letters(secret_word);
            console.log('Congratulations, you won!');
            console.log('Your total score for this game is: ', score);
            break;
            }

        if (guessNum <= 0) {
            console.log('Sorry, you ran out of guesses. The word was: ', secret_word);
            break;
            }
  }
}
// # -----------------------------------


// # When you've completed your hangman_with_hint function, comment the two similar
// # lines above that were used to run the hangman function, and then uncomment
// # these two lines and run this file to test!
// # Hint: You might want to pick your own secret_word while you're testing.


// if __name__ == "__main__":
//     # pass

//     # To test part 2, comment out the pass line above and
//     # uncomment the following two lines.

//     # secret_word = choose_word(wordlist)
//     # hangman(secret_word)


// ###############

//     # To test part 3 re-comment out the above lines and
//     # uncomment the following two lines.

//     secret_word = choose_word(wordlist)
//     hangman_with_hints(secret_word)