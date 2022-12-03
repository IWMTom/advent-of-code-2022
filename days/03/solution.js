const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const dayThree = async () => {
  console.log("Day 3");

  partOne();
  partTwo();
};

const calculatePriority = (char) => {
  const ascii = char.charCodeAt(0);

  if (ascii >= 65 && ascii <= 90) {
    // Uppercase letter
    return ascii - 65 + 27; // Range of 27-52
  } else if (ascii >= 97 && ascii <= 122) {
    // Lowercase letter
    return ascii - 97 + 1; // Range of 1-26
  }
};

const partOne = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/03/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  let sum = 0;

  rl.on("line", (line) => {
    const compartmentOne = line.slice(0, line.length / 2);
    const compartmentTwo = line.slice(line.length / 2, line.length);

    const [intersect] = _.intersection([...compartmentOne], [...compartmentTwo]);
    const priority = calculatePriority(intersect);

    sum += priority;
  });

  rl.on("close", () => {
    console.log(`Part One - Sum of all priorities is ${sum}`);
  });
};

const partTwo = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/03/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  let sum = 0;
  let rucksacks = [];

  rl.on("line", (line) => {
    rucksacks.push(line);

    if (rucksacks.length === 3) {
      const [intersect] = _.intersection([...rucksacks[0]], [...rucksacks[1]], [...rucksacks[2]]);
      const priority = calculatePriority(intersect);

      sum += priority;

      rucksacks = [];
    }
  });

  rl.on("close", () => {
    console.log(`Part Two - Sum of all priorities is ${sum}`);
  });
};

module.exports = { dayThree };
