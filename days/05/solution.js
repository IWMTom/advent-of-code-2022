const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const dayFive = async () => {
  console.log("Day 5");

  partOne();
  partTwo();
};

const EMPTY_LINE = "";
const EMPTY_SPACE = " ";

const partOne = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/05/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  const introLines = [];
  let processedIntroLines = false;
  const stacks = [];

  rl.on("line", (line) => {
    // Build stacks
    if (!processedIntroLines) {
      if (line !== EMPTY_LINE) {
        introLines.push(line);
      } else {
        for (let i = introLines.length - 1; i >= 0; i--) {
          for (let j = 1; j <= introLines[i].length; j += 4) {
            const char = introLines[i][j];

            if (char !== EMPTY_SPACE) {
              const stackNumber = (j - 1) / 4;
              if (!stacks[stackNumber]) stacks[stackNumber] = [];
              stacks[stackNumber].push(char);
            }
          }
        }

        processedIntroLines = true;
      }
    } else {
      // Manipulate stacks
      const [numToMove, source, dest] = line
        .replace("move ", "")
        .replace(" from ", ";")
        .replace(" to ", ";")
        .split(";")
        .map((v) => parseInt(v));

      for (let i = 0; i < numToMove; i++) {
        const sourceIndex = source - 1;
        const destIndex = dest - 1;

        stacks[destIndex].push(stacks[sourceIndex].pop());
      }
    }
  });

  rl.on("close", () => {
    const message = stacks.map((s) => s.pop()).join("");
    console.log(`Part One - Message is ${message}`);
  });
};

const partTwo = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/05/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  const introLines = [];
  let processedIntroLines = false;
  const stacks = [];

  rl.on("line", (line) => {
    // Build stacks
    if (!processedIntroLines) {
      if (line !== EMPTY_LINE) {
        introLines.push(line);
      } else {
        const lastLine = introLines.pop();
        const numberOfStacks = (lastLine.length + 1) / 4;

        for (let i = introLines.length - 1; i >= 0; i--) {
          for (let j = 1; j <= introLines[i].length; j += 4) {
            const char = introLines[i][j];

            if (char !== EMPTY_SPACE) {
              const stackNumber = (j - 1) / 4;
              if (!stacks[stackNumber]) stacks[stackNumber] = [];
              stacks[stackNumber].push(char);
            }
          }
        }

        processedIntroLines = true;
      }
    } else {
      // Manipulate stacks
      const [numToMove, source, dest] = line
        .replace("move ", "")
        .replace(" from ", ";")
        .replace(" to ", ";")
        .split(";")
        .map((v) => parseInt(v));

      const poppedCrates = [];
      for (let i = 0; i < numToMove; i++) {
        const sourceIndex = source - 1;
        poppedCrates.push(stacks[sourceIndex].pop());
      }

      const reversedPoppedCrates = poppedCrates.reverse();
      for (let i = 0; i < reversedPoppedCrates.length; i++) {
        const destIndex = dest - 1;
        stacks[destIndex].push(reversedPoppedCrates[i]);
      }
    }
  });

  rl.on("close", () => {
    const message = stacks.map((s) => s.pop()).join("");
    console.log(`Part Two - Message is ${message}`);
  });
};

module.exports = { dayFive };
