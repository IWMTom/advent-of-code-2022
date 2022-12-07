const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const File = (filename, size) => {
  return {
    filename,
    size,
  };
};

const Directory = (path, files, directories, parent) => {
  return {
    path,
    files,
    directories,
    parent,
  };
};

const daySeven = async () => {
  console.log("Day 7");

  partOne();
  partTwo();
};

const partOne = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/07/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  const filesystem = Directory("/", [], [], null);
  let pointer = filesystem;
  let listingFiles = false;

  rl.on("line", (line) => {
    if (line.startsWith("$")) {
      listingFiles = false;

      const [, command] = line.split("$ ");
      const [prog, args] = command.split(" ");

      if (prog === "cd") {
        if (args === "/") {
          pointer = filesystem;
        } else if (args === "..") {
          pointer = pointer.parent;
        } else {
          const existingDir = pointer.directories.find((d) => d.path === `${pointer.path}${args}/`);
          if (existingDir) {
            pointer = existingDir;
          } else {
            let newDir = Directory(`${pointer.path}${args}/`, [], [], pointer);
            pointer.directories.push(newDir);
            pointer = newDir;
          }
        }
      } else if (prog === "ls") {
        listingFiles = true;
      }
    } else {
      if (listingFiles) {
        if (line.startsWith("dir")) {
          const [, dirName] = line.split(" ");

          const existingDir = pointer.directories.find((d) => d.path === `${pointer.path}${dirName}/`);
          if (!existingDir) {
            let newDir = Directory(`${pointer.path}${dirName}/`, [], [], pointer);
            pointer.directories.push(newDir);
          }
        } else {
          const [size, filename] = line.split(" ");

          const existingFile = pointer.files.find((f) => f.filename === filename);
          if (!existingFile) {
            let newFile = File(filename, size);
            pointer.files.push(newFile);
          }
        }
      }
    }
  });

  rl.on("close", () => {
    const dirSizes = [];
    calculateSizes(filesystem, dirSizes);
    const acceptableDirSizes = dirSizes.filter((s) => s <= 100000);
    const sum = acceptableDirSizes.reduce((acc, cur) => acc + cur, 0);
    console.log(`Part One - Sum is ${sum}`);
  });
};

const calculateSizes = (directory, dirSizes) => {
  const allFilesSize = directory.files.reduce((acc, cur) => acc + parseInt(cur.size), 0);
  const allDirectoriesSize = directory.directories.reduce((acc, cur) => {
    calculateSizes(cur, dirSizes);
    return acc + cur.size;
  }, 0);
  directory.size = allFilesSize + allDirectoriesSize;
  dirSizes.push(directory.size);
};

const partTwo = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("days/07/input.txt"),
    output: process.stdout,
    terminal: false,
  });

  const filesystem = Directory("/", [], [], null);
  let pointer = filesystem;
  let listingFiles = false;

  rl.on("line", (line) => {
    if (line.startsWith("$")) {
      listingFiles = false;

      const [, command] = line.split("$ ");
      const [prog, args] = command.split(" ");

      if (prog === "cd") {
        if (args === "/") {
          pointer = filesystem;
        } else if (args === "..") {
          pointer = pointer.parent;
        } else {
          const existingDir = pointer.directories.find((d) => d.path === `${pointer.path}${args}/`);
          if (existingDir) {
            pointer = existingDir;
          } else {
            let newDir = Directory(`${pointer.path}${args}/`, [], [], pointer);
            pointer.directories.push(newDir);
            pointer = newDir;
          }
        }
      } else if (prog === "ls") {
        listingFiles = true;
      }
    } else {
      if (listingFiles) {
        if (line.startsWith("dir")) {
          const [, dirName] = line.split(" ");

          const existingDir = pointer.directories.find((d) => d.path === `${pointer.path}${dirName}/`);
          if (!existingDir) {
            let newDir = Directory(`${pointer.path}${dirName}/`, [], [], pointer);
            pointer.directories.push(newDir);
          }
        } else {
          const [size, filename] = line.split(" ");

          const existingFile = pointer.files.find((f) => f.filename === filename);
          if (!existingFile) {
            let newFile = File(filename, size);
            pointer.files.push(newFile);
          }
        }
      }
    }
  });

  rl.on("close", () => {
    const dirSizes = [];
    calculateSizes(filesystem, dirSizes);

    const TOTAL_SIZE = 70000000;
    const CURRENT_USED_SIZE = filesystem.size;
    const AVAILABLE_SIZE = TOTAL_SIZE - CURRENT_USED_SIZE;
    const UPDATE_SIZE = 30000000;
    const SIZE_REQUIRED = UPDATE_SIZE - AVAILABLE_SIZE;

    const acceptableDirSizes = dirSizes.filter((s) => s >= SIZE_REQUIRED);
    const minSize = Math.min(...acceptableDirSizes);
    console.log(`Part Two - Min size is ${minSize}`);
  });
};

module.exports = { daySeven };
