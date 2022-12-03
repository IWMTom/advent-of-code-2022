const fs = require("fs");
const readline = require("readline");

const dayOne = async () => {
  console.log("Day 1");

  partOne();
  partTwo();
};

const EMPTY_LINE = "";

const partOne = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/01/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  let highestCalorieCount = 0;
  let currentCalorieCount = 0;

  const checkAndUpdateHighestCount = () => {
    if (currentCalorieCount > highestCalorieCount) {
      highestCalorieCount = currentCalorieCount;
    }
  };

  rl.on("line", (line) => {
    if (line == EMPTY_LINE) {
      checkAndUpdateHighestCount();
      currentCalorieCount = 0;
    } else {
      currentCalorieCount += parseInt(line);
    }
  });

  rl.on("close", () => {
    checkAndUpdateHighestCount();
    console.log(`Highest calorie count is ${highestCalorieCount}`);
  });
};

const partTwo = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/01/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  let calorieCounts = [];
  let currentCalorieCount = 0;

  rl.on("line", (line) => {
    if (line == EMPTY_LINE) {
      calorieCounts.push(currentCalorieCount);
      currentCalorieCount = 0;
    } else {
      currentCalorieCount += parseInt(line);
    }
  });

  rl.on("close", () => {
    calorieCounts.sort((a, b) => b - a);
    console.log(
      `Top three calorie counts are ${calorieCounts[0]}, ${calorieCounts[1]}, and ${calorieCounts[2]} - the total is ${
        calorieCounts[0] + calorieCounts[1] + calorieCounts[2]
      }`
    );
  });
};

module.exports = { dayOne };
