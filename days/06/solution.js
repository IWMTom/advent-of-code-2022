const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const daySix = async () => {
  console.log("Day 6");

  partOne();
  partTwo();
};

const findMessage = (datastream, sizeOfMessage) => {
  for (let i = 0; i < datastream.length - sizeOfMessage - 1; i++) {
    const substr = datastream.slice(i, i + sizeOfMessage);
    const uniq = _.uniq([...substr]);

    if (uniq.length === sizeOfMessage) {
      return i + sizeOfMessage;
    }
  }
};

const partOne = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/06/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  let datastream = "";
  rl.on("line", (line) => {
    datastream = line;
  });

  rl.on("close", () => {
    const message = findMessage(datastream, 4);

    console.log(`Part One - First instance is after character ${message}`);
  });
};

const partTwo = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/06/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  let datastream = "";
  rl.on("line", (line) => {
    datastream = line;
  });

  rl.on("close", () => {
    const message = findMessage(datastream, 14);

    console.log(`Part Two - First instance is after character ${message}`);
  });
};

module.exports = { daySix };
