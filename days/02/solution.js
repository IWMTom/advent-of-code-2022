const fs = require("fs");
const readline = require("readline");

const dayTwo = async () => {
  console.log("Day 2");

  partOne();
  partTwo();
};

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DRAW = "DRAW";
const PLAYERONE_WIN = "PLAYERONE_WIN";
const PLAYERTWO_WIN = "PLAYERTWO_WIN";

const calculateRoundScore = (outcome, selectedShape) => {
  let totalScore = 0;

  switch (outcome) {
    case PLAYERTWO_WIN:
      totalScore += 6;
      break;
    case DRAW:
      totalScore += 3;
      break;
  }

  switch (selectedShape) {
    case ROCK:
      totalScore += 1;
      break;
    case PAPER:
      totalScore += 2;
      break;
    case SCISSORS:
      totalScore += 3;
      break;
  }

  return totalScore;
};

const partOne = () => {
  const RESPONSE_MAP = {
    A: ROCK,
    B: PAPER,
    C: SCISSORS,
    X: ROCK,
    Y: PAPER,
    Z: SCISSORS,
  };

  const rl = readline.createInterface({
    input: fs.createReadStream("days/02/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  /*
   * Rock beats Scissors
   * Scissors beats Paper
   * Paper beats Rock
   */
  const calculateOutcome = (playerOne, playerTwo) => {
    if (playerOne == playerTwo) return DRAW;

    if (
      (playerOne == ROCK && playerTwo == SCISSORS) ||
      (playerOne == PAPER && playerTwo == ROCK) ||
      (playerOne == SCISSORS && playerTwo == PAPER)
    )
      return PLAYERONE_WIN;

    if (
      (playerTwo == ROCK && playerOne == SCISSORS) ||
      (playerTwo == PAPER && playerOne == ROCK) ||
      (playerTwo == SCISSORS && playerOne == PAPER)
    )
      return PLAYERTWO_WIN;
  };

  let totalScore = 0;

  rl.on("line", (line) => {
    const [playerOne, playerTwo] = line.split(" ").map((r) => RESPONSE_MAP[r]);
    const outcome = calculateOutcome(playerOne, playerTwo);
    const roundScore = calculateRoundScore(outcome, playerTwo);
    totalScore += roundScore;
  });

  rl.on("close", () => {
    console.log(`Part 1 - Total score is ${totalScore}`);
  });
};

const partTwo = () => {
  const RESPONSE_MAP = {
    A: ROCK,
    B: PAPER,
    C: SCISSORS,
    X: PLAYERONE_WIN,
    Y: DRAW,
    Z: PLAYERTWO_WIN,
  };

  const rl = readline.createInterface({
    input: fs.createReadStream("days/02/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  /*
   * Rock beats Scissors
   * Scissors beats Paper
   * Paper beats Rock
   */
  const calculateRequiredShape = (playerOneShape, requiredOutcome) => {
    if (requiredOutcome == DRAW) return playerOneShape;

    if (requiredOutcome == PLAYERONE_WIN) {
      switch (playerOneShape) {
        case ROCK:
          return SCISSORS;
        case PAPER:
          return ROCK;
        case SCISSORS:
          return PAPER;
      }
    }

    if (requiredOutcome == PLAYERTWO_WIN) {
      switch (playerOneShape) {
        case ROCK:
          return PAPER;
        case PAPER:
          return SCISSORS;
        case SCISSORS:
          return ROCK;
      }
    }
  };

  let totalScore = 0;

  rl.on("line", (line) => {
    const [playerOneShape, requiredOutcome] = line.split(" ").map((r) => RESPONSE_MAP[r]);
    const requiredShape = calculateRequiredShape(playerOneShape, requiredOutcome);
    const roundScore = calculateRoundScore(requiredOutcome, requiredShape);
    totalScore += roundScore;
  });

  rl.on("close", () => {
    console.log(`Part 2 - Total score is ${totalScore}`);
  });
};

module.exports = { dayTwo };
