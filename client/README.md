# Dictionary Dash

## Description

**Dictionary Dash** is an engaging and educational word game where players are challenged to guess a word based on its definition, the number of letters, and the starting letter. The goal is to guess as many words as possible within 60 seconds.

This project was inspired by the times I used to play a similar game with friends using a pocket dictionary. We would spend a lot of time flipping through pages to find words and definitions. With **Dictionary Dash**, we've streamlined that process by eliminating the need for a physical dictionary and adding a timer element to increase the excitement and challenge. Now, players can focus on guessing words quickly and accurately without any interruptions.

The app solves the problem of manual word lookup by providing instant definitions and leveraging a timer to enhance the game's pace. Through this project, I learned how to integrate APIs, handle user input, and manage state in a React application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technology](#technology)
- [Features](#features)
- [Repository and Deployment](#repository-and-deployment)


## Installation

Follow these steps to install and run the project:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd dictionary-dash
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Usage

### How to Play

#### User Story 1: Starting the Game
- **As a user**, I want to open the app and see a header with the game title, a "Start" button, and a prompt that says, "How many words can you guess in 60 seconds?" so that I know what the game is about.
- **As a user**, I want to press the "Start" button to begin the game.

#### User Story 2: Playing the Game
- **As a user**, I want to see a timer counting down from 60 seconds, so I know how much time I have left to guess the words.
- **As a user**, I want to see a word definition on the screen, so I can try to guess the word.
- **As a user**, I want to see a hint button, the first letter of the word, and a dashed line indicating the number of letters in the word, so I have clues to help me guess the word.

#### User Story 3: Input Mechanism
- **As a user**, I want to use the on-screen keyboard to type in my guesses.
- **As a computer user**, I want to be able to use my physical keyboard to enter letters, so I can play the game more easily.

#### User Story 4: Game Controls
- **As a user**, I want to press "Enter" to submit my guess.
- **As a user**, I want to press "Skip" to skip the current word and move to the next one.
- **As a user**, I want to press "Back" to delete the last letter I entered.
- **As a user**, I want to press the "Hint" button to reveal additional information if I’m stuck.

<br>
<div style="width:500px;">
   <img src="public/assets/localhost_5173_(iPhone SE).png" alt="Game Screenshot"/>
</div>
<br>

## Technology

- [React](https://reactjs.org/)
- [SASS](https://sass-lang.com/)
- [UUID](https://www.npmjs.com/package/uuid)
- [Free Dictionary API](https://dictionaryapi.dev/)
- [TypeScript](https://www.typescriptlang.org/)


## Features

- Real-time word guessing based on definitions.
- On-screen and physical keyboard support.
- Hint system to aid players.
- Timer-based challenge.


## Repository and Deployment

- **Repository Link:** [Dictionary Dash GitHub Repository](https://github.com/katredford/dictionary_dash)

- **Deployed Application:** [Dictionary Dash Live](https://dictionarydash.netlify.app/)


