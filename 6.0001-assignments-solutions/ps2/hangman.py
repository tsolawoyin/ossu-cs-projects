# Problem Set 2, hangman.py
# Name: Olawoyin Temidayo
# Collaborators: None
# Time spent: 7hrs_

# Hangman Game
# -----------------------------------
# Helper code
# You don't need to understand this helper code,
# but you will have to know how to use the functions
# (so be sure to read the docstrings!)
import random
import string

WORDLIST_FILENAME = "words.txt"


def load_words():
    """
    Returns a list of valid words. Words are strings of lowercase letters.
    
    Depending on the size of the word list, this function may
    take a while to finish.
    """
    print("Loading word list from file...")
    # inFile: file
    inFile = open(WORDLIST_FILENAME, 'r')
    # line: string
    line = inFile.readline()
    # wordlist: list of strings
    wordlist = line.split()
    print("  ", len(wordlist), "words loaded.")
    return wordlist



def choose_word(wordlist):
    """
    wordlist (list): list of words (strings)
    
    Returns a word from wordlist at random
    """
    return random.choice(wordlist)

# end of helper code

# -----------------------------------

# Load the list of words into the variable wordlist
# so that it can be accessed from anywhere in the program
wordlist = load_words()


def is_word_guessed(secret_word, letters_guessed):
    '''
    secret_word: string, the word the user is guessing; assumes all letters are
      lowercase
    letters_guessed: list (of letters), which letters have been guessed so far;
      assumes that all letters are lowercase
    returns: boolean, True if all the letters of secret_word are in letters_guessed;
      False otherwise
    '''
    return "".join(sorted(set(secret_word))) == "".join(sorted(letters_guessed))



def get_guessed_word(secret_word, letters_guessed):
    '''
    secret_word: string, the word the user is guessing
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string, comprised of letters, underscores (_), and spaces that represents
      which letters in secret_word have been guessed so far.
    '''
    curr_guess = ""
    for alpha in secret_word:
        if alpha in letters_guessed:
            curr_guess += alpha
        else:
            curr_guess += "_ "
    return curr_guess



def get_available_letters(letters_guessed):
    '''
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string (of letters), comprised of letters that represents which letters have not
      yet been guessed.
    '''
    available = ""
    for letter in string.ascii_lowercase:
        if not letter in letters_guessed:
            available += letter
    return available
    
    

def hangman(secret_word):
    '''
    secret_word: string, the secret word to guess.
    
    Starts up an interactive game of Hangman.
    
    * At the start of the game, let the user know how many 
      letters the secret_word contains and how many guesses s/he starts with.
      
    * The user should start with 6 guesses

    * Before each round, you should display to the user how many guesses
      s/he has left and the letters that the user has not yet guessed.
    
    * Ask the user to supply one guess per round. Remember to make
      sure that the user puts in a letter!
    
    * The user should receive feedback immediately after each guess 
      about whether their guess appears in the computer's word.

    * After each guess, you should display to the user the 
      partially guessed word so far.
    
    Follows the other limitations detailed in the problem write-up.
    '''
    # let the game begins
    print("Welcome to the game Hangman !")
    warnings_left = 3

    print(f"I am thinking of a word that is {len(secret_word)} letters long.")
    print(f"You have {warnings_left} warnings left\n-------------")
    good_guesses = list()
    total_guess = list()
    guess_left = 6

    vowel = ("a","e","i","o","u")
    consonant = ("b","c","d","f",'g',"h","j",'k','l','m','n','p','q','r','s','t','v','w','x','y','z')

    while True:
        # if user completes the guess
        if is_word_guessed(secret_word, good_guesses):
            print(f"Congratulations, you won!\nYour total score is  {guess_left * len(set(secret_word))}")
            break
        # if out of guess, then game over
        if guess_left < 1:
            print(f"Sorry, you ran out of guesses.The word was {secret_word}")
            break

        ###################### Display information #######################
        print(f"You have {guess_left} guesses left")
        print(f"Available letters: {get_available_letters(total_guess)}")
        ##############################################################

        ##############player's guess ############################################
        player_guess = input("Please guess a letter: ")

        if not player_guess.isalpha():
            if warnings_left:
                print(f"Oops! That is not a valid letter. You have {warnings_left - 1} warnings left\n-------------")
                warnings_left -= 1
            else:
                print(f"\nOops! That is not a valid letter. You have {warnings_left} so you lose one guess\n-------------")
                guess_left -= 1
            continue    
        
        player_guess = player_guess.lower()
        ############################################################

        ####################### if guess not in secret word ################################

        if not player_guess in secret_word:
            if not player_guess in total_guess:
                if player_guess in consonant:
                    print(f"Oops! That letter is not in my word: {get_guessed_word(secret_word, good_guesses)}\n-------------")
                    guess_left -= 1
                    total_guess.append(player_guess)
                elif player_guess in vowel:
                    print(f"Oops! That letter is not in my word: {get_guessed_word(secret_word, good_guesses)}\n-------------")
                    guess_left -= 2
                    total_guess.append(player_guess)
            else:
                if warnings_left:
                    print(f"Oops! you've already guessed this. You have {warnings_left - 1} warnings left: {get_guessed_word(secret_word, good_guesses)}")
                    warnings_left -= 1
                else:
                    print(f"Oops! you've already guessed this. You have {warnings_left} warnings left so you lose one guess: {get_guessed_word(secret_word, good_guesses)}")
                    guess_left -= 1
            continue
        ##############################################################################

        ########## so if guess in secret word #################################

        if player_guess in secret_word:
            if not player_guess in total_guess:
                good_guesses.append(player_guess)
                total_guess.append(player_guess)
                print(f"Good guess: {get_guessed_word(secret_word, good_guesses)}\n-------------")
            else:
                if warnings_left:
                    print(f"You've already guessed that letter. You have {warnings_left - 1} warnings left: {get_guessed_word(secret_word, good_guesses)}\n-------------")
                    warnings_left -= 1
                else:
                    print(f"You've already guessed that letter. You have {warnings_left} warning left so you lose one guess: {get_guessed_word(secret_word, good_guesses)}\n-------------")
                    guess_left -= 1

        #######################################################################



# When you've completed your hangman function, scroll down to the bottom
# of the file and uncomment the first two lines to test
#(hint: you might want to pick your own
# secret_word while you're doing your own testing)


# -----------------------------------



def match_with_gaps(my_word, other_word):
    '''
    my_word: string with _ characters, current guess of secret word
    other_word: string, regular English word
    returns: boolean, True if all the actual letters of my_word match the 
        corresponding letters of other_word, or the letter is the special symbol
        _ , and my_word and other_word are of the same length;
        False otherwise: 
    '''
    my_word = my_word.replace("_ ", "*") # replace (_ ) with an asterisk.
    word_len = len(my_word)
    
    duplicate_check = list() # Remember that when a letter is guessed, your code reveals all the positions at which that letter occurs in the secret word. Therefore, the hiddden letter (_ ) cannot be one of the letters in the word that has already been revealed.

    if word_len != len(other_word):
        return False
    
    for n in range(word_len):
        if my_word[n] == "*":
            duplicate_check.append(other_word[n])
        elif my_word[n] != other_word[n]:
            return False
    
    ######## dealing with duplicates ###############
    for n in other_word:
        if n in duplicate_check and n in my_word:
            return False
    return True
    ################################################
    # will modify that one later.



def show_possible_matches(my_word):
    '''
    my_word: string with _ characters, current guess of secret word
    returns: nothing, but should print out every word in wordlist that matches my_word
             Keep in mind that in hangman when a letter is guessed, all the positions
             at which that letter occurs in the secret word are revealed.
             Therefore, the hidden letter(_ ) cannot be one of the letters in the word
             that has already been revealed.

    '''
    for word in wordlist:
        if match_with_gaps(my_word, word):
            print(word, end=" ")



def hangman_with_hints(secret_word):
    '''
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
    '''
    # let the game begins
    print("Welcome to the game Hangman!")
    warnings_left = 3

    print(f"I am thinking of a word that is {len(secret_word)} letters long.")
    print(f"You have {warnings_left} warnings left\n-------------")
    good_guesses = list()
    total_guess = list()
    guess_left = 6

    vowel = ("a","e","i","o","u")
    consonant = ("b","c","d","f",'g',"h","j",'k','l','m','n','p','q','r','s','t','v','w','x','y','z')

    while True:
        # if user completes the guess
        if is_word_guessed(secret_word, good_guesses):
            print(f"Congratulations, you won!\nYour total score is  {guess_left * len(set(secret_word))}")
            break
        # if out of guess, then game over
        if guess_left < 1:
            print(f"Sorry, you ran out of guesses.The word was {secret_word}")
            break

        ###################### Display information #######################
        print(f"You have {guess_left} guesses left")
        print(f"Available letters: {get_available_letters(total_guess)}")
        ##############################################################

        ##############player's guess ############################################
        player_guess = input("Please guess a letter: ")

        # ###### Show hint ##########################

        if player_guess == "*":
                print("Possible matches are \n")
                show_possible_matches(get_guessed_word(secret_word, good_guesses))
                print("\n-------------")
                continue
        
        #############################################
        if not player_guess.isalpha():
            if warnings_left:
                print(f"Oops! That is not a valid letter. You have {warnings_left - 1} warnings left\n-------------")
                warnings_left -= 1
            else:
                print(f"\nOops! That is not a valid letter. You have {warnings_left} so you lose one guess\n-------------")
                guess_left -= 1
            continue    
        
        player_guess = player_guess.lower()

        ############################################################

        ####################### if guess not in secret word ################################

        if not player_guess in secret_word:
            if not player_guess in total_guess:
                if player_guess in consonant:
                    print(f"Oops! That letter is not in my word: {get_guessed_word(secret_word, good_guesses)}\n-------------")
                    guess_left -= 1
                    total_guess.append(player_guess)
                elif player_guess in vowel:
                    print(f"Oops! That letter is not in my word: {get_guessed_word(secret_word, good_guesses)}\n-------------")
                    guess_left -= 2
                    total_guess.append(player_guess)
            else:
                if warnings_left:
                    print(f"Oops! you've already guessed this. You have {warnings_left - 1} warnings left: {get_guessed_word(secret_word, good_guesses)}")
                    warnings_left -= 1
                else:
                    print(f"Oops! you've already guessed this. You have {warnings_left} warnings left so you lose one guess: {get_guessed_word(secret_word, good_guesses)}")
                    guess_left -= 1
            continue
        ##############################################################################

        ########## so if guess in secret word #################################

        if player_guess in secret_word:
            if not player_guess in total_guess:
                good_guesses.append(player_guess)
                total_guess.append(player_guess)
                print(f"Good guess: {get_guessed_word(secret_word, good_guesses)}\n-------------")
            else:
                if warnings_left:
                    print(f"You've already guessed that letter. You have {warnings_left - 1} warnings left: {get_guessed_word(secret_word, good_guesses)}\n-------------")
                    warnings_left -= 1
                else:
                    print(f"You've already guessed that letter. You have {warnings_left} warning left so you lose one guess: {get_guessed_word(secret_word, good_guesses)}\n-------------")
                    guess_left -= 1

        #######################################################################



# When you've completed your hangman_with_hint function, comment the two similar
# lines above that were used to run the hangman function, and then uncomment
# these two lines and run this file to test!
# Hint: You might want to pick your own secret_word while you're testing.


if __name__ == "__main__":
    # pass

    # To test part 2, comment out the pass line above and
    # uncomment the following two lines.
    
    # secret_word = choose_word(wordlist)
    # hangman(secret_word)

###############
    
    # To test part 3 re-comment out the above lines and 
    # uncomment the following two lines. 
    
    secret_word = choose_word(wordlist)
    hangman_with_hints(secret_word)
