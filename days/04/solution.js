const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const dayFour = async () => {
  console.log("Day 4");

  partOne();
  partTwo();
};

const partOne = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/04/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  let count = 0;
  rl.on("line", (line) => {
    const [rangeOne, rangeTwo] = line.split(",");
    const [rangeOneLower, rangeOneUpper] = rangeOne.split("-").map((r) => parseInt(r));
    const [rangeTwoLower, rangeTwoUpper] = rangeTwo.split("-").map((r) => parseInt(r));

    if (
      (rangeOneLower <= rangeTwoLower && rangeOneUpper >= rangeTwoUpper) ||
      (rangeTwoLower <= rangeOneLower && rangeTwoUpper >= rangeOneUpper)
    ) {
      count++;
    }
  });

  rl.on("close", () => {
    console.log(`Part One - Total count is ${count}`);
  });
};

const partTwo = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/04/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  let count = 0;
  rl.on("line", (line) => {
    const [rangeOne, rangeTwo] = line.split(",");
    const [rangeOneLower, rangeOneUpper] = rangeOne.split("-").map((r) => parseInt(r));
    const [rangeTwoLower, rangeTwoUpper] = rangeTwo.split("-").map((r) => parseInt(r));

    if (
      (rangeOneLower <= rangeTwoLower && rangeOneUpper >= rangeTwoLower) ||
      (rangeOneUpper <= rangeTwoUpper && rangeOneUpper >= rangeTwoUpper) ||
      (rangeTwoLower <= rangeOneLower && rangeTwoUpper >= rangeOneLower) ||
      (rangeTwoUpper <= rangeOneUpper && rangeTwoUpper >= rangeOneUpper)
    ) {
      count++;
    }
  });

  rl.on("close", () => {
    console.log(`Part Two - Total count is ${count}`);
  });
};

module.exports = { dayFour };
