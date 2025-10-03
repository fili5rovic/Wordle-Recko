# Rečko (Serbian Wordle)

This project is a **web-based word guessing game** built with **HTML**, **CSS**, and **JavaScript**. "Rečko" is a Serbian adaptation of the popular Wordle game, where players try to guess a secret 5-letter word within 6 attempts. The game also tracks player statistics.

> Developed as a laboratory assignment for the "Web Design" course at the University of Belgrade School of Electrical Engineering. For detailed requirements, see [instructions.pdf](instructions.pdf).

## Features

### Gameplay
- **Word Guessing**: Guess the secret 5-letter word in up to 6 tries
- **Color-coded Feedback**: 
  - Green: Letter is correct and in the right place
  - Yellow: Letter is in the word but in the wrong spot
  - Gray: Letter isn't in the word
- **Input Validation**: Only accepts valid dictionary words
- **Keyboard Support**: Works with both physical and on-screen keyboards

> [!NOTE]
> The demonstration uses a limited word list.

### Statistics & Progress
- **Game Stats**: Tracks total games played, win percentage, current streak, and max streak
- **Guess Distribution**: Histogram chart shows how many attempts are needed to win
- **Persistent Progress**: Stats are saved via local storage across browser sessions

### Help & Instructions
- **Interactive Tutorial**: Step-by-step help with visual examples
- **Color-coded Examples**: Demonstrates the feedback system
- **Rules Overview**: Clear explanations of how to play

## Game Rules

1. **Goal**: Guess the secret 5-letter word within 6 tries
2. **Input**: Type your guess and press `ENTER` to submit (use `Backspace` to delete before submitting)
3. **Feedback**: Letters are colored after each guess:
   - **Green**: Correct letter in correct position
   - **Yellow**: Correct letter in wrong position
   - **Gray**: Letter is not in the word
4. **Win Condition**: Guess the word in 6 or fewer attempts
5. **Dictionary Restriction**: Only words from the built-in dictionary are allowed

---

