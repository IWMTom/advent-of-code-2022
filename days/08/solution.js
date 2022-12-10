const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const dayEight = async () => {
  console.log("Day 8");

  partOne();
  partTwo();
};

const partOne = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/08/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  const grid = [];

  rl.on("line", (line) => {
    grid.push([...line]);
  });

  rl.on("close", () => {
    const perimiter = (grid.length - 2) * 2 + grid[0].length * 2;

    const tallestTrees = [];

    // LEFT PROJECTION
    for (let i = 1; i < grid.length - 1; i++) {
      const line = grid[i];
      let maxSize = 0;
      let maxSizeCoord = "";
      for (let j = 0; j < line.length - 1; j++) {
        const size = parseInt(line[j]);
        if (size > maxSize) {
          maxSize = size;
          maxSizeCoord = `${i}|${j}`;
          if (!maxSizeCoord.split("|").some((c) => parseInt(c) === 0 || parseInt(c) === grid.length - 1)) {
            tallestTrees.push(maxSizeCoord);
          }
        }
      }
    }

    // RIGHT PROJECTION
    for (let i = 1; i < grid.length - 1; i++) {
      const line = grid[i];
      let maxSize = 0;
      let maxSizeCoord = "";
      for (let j = line.length - 1; j > 0; j--) {
        const size = parseInt(line[j]);
        if (size > maxSize) {
          maxSize = size;
          maxSizeCoord = `${i}|${j}`;

          if (!tallestTrees.includes(maxSizeCoord)) {
            if (!maxSizeCoord.split("|").some((c) => parseInt(c) === 0 || parseInt(c) === grid.length - 1)) {
              tallestTrees.push(maxSizeCoord);
            }
          }
        }
      }
    }

    // TOP PROJECTION
    for (let i = 0; i < grid[0].length - 1; i++) {
      let maxSize = 0;
      let maxSizeCoord = "";
      for (let j = 0; j < grid.length - 1; j++) {
        const size = parseInt(grid[j][i]);
        if (size > maxSize) {
          maxSize = size;
          maxSizeCoord = `${j}|${i}`;

          if (!tallestTrees.includes(maxSizeCoord)) {
            if (!maxSizeCoord.split("|").some((c) => parseInt(c) === 0 || parseInt(c) === grid.length - 1)) {
              tallestTrees.push(maxSizeCoord);
            }
          }
        }
      }
    }

    // BOTTOM PROJECTION
    for (let i = 0; i < grid[0].length - 1; i++) {
      let maxSize = 0;
      let maxSizeCoord = "";
      for (let j = grid.length - 1; j > 0; j--) {
        const size = parseInt(grid[j][i]);
        if (size > maxSize) {
          maxSize = size;
          maxSizeCoord = `${j}|${i}`;

          if (!tallestTrees.includes(maxSizeCoord)) {
            if (!maxSizeCoord.split("|").some((c) => parseInt(c) === 0 || parseInt(c) === grid.length - 1)) {
              tallestTrees.push(maxSizeCoord);
            }
          }
        }
      }
    }

    console.log(`Part One - Perimeter - ${perimiter} - Inner - ${tallestTrees.length} - Trees: ${perimiter + tallestTrees.length}`);
  });
};

const partTwo = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/08/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  const grid = [];

  rl.on("line", (line) => {
    grid.push([...line]);
  });

  rl.on("close", () => {
    let highestScore = 0;

    const inspectTreeLocation = (x, y) => {
      let leftDistance = 0;
      let rightDistance = 0;
      let topDistance = 0;
      let bottomDistance = 0;

      // LOOKING LEFT
      for (let i = x - 1; i >= 0; i--) {
        const originTreeValue = parseInt(grid[y][x]);
        const currentTreeValue = parseInt(grid[y][i]);

        leftDistance++;
        if (currentTreeValue >= originTreeValue) {
          break;
        }
      }

      // LOOKING RIGHT
      for (let i = x + 1; i < grid[0].length; i++) {
        const originTreeValue = parseInt(grid[y][x]);
        const currentTreeValue = parseInt(grid[y][i]);

        rightDistance++;
        if (currentTreeValue >= originTreeValue) {
          break;
        }
      }

      // LOOKING UP
      for (let i = y - 1; i >= 0; i--) {
        const originTreeValue = parseInt(grid[y][x]);
        const currentTreeValue = parseInt(grid[i][x]);

        topDistance++;
        if (currentTreeValue >= originTreeValue) {
          break;
        }
      }

      // LOOKING DOWN
      for (let i = y + 1; i < grid.length; i++) {
        const originTreeValue = parseInt(grid[y][x]);
        const currentTreeValue = parseInt(grid[i][x]);

        bottomDistance++;
        if (currentTreeValue >= originTreeValue) {
          break;
        }
      }

      const score = leftDistance * rightDistance * topDistance * bottomDistance;

      if (score > highestScore) {
        highestScore = score;
      }
    };

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        inspectTreeLocation(j, i);
      }
    }

    console.log(`Part Two - Highest score ${highestScore}`);
  });
};

module.exports = { dayEight };
