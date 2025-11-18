// חסן עומר

const fs = require("fs");
const path = require("path");

// Directory that contains all text files
const dirPath = path.join(__dirname, "text");

// File names we will create/read
const arrOfFiles = ["1.txt", "2.txt", "3.txt"];

const fn = () => {
  // -------------------------------
  // CREATE INPUT FILES (random content)
  // -------------------------------
  for (let i = 0; i < arrOfFiles.length; i++) {
    // Generate random number of lines (1–10)
    let randomLines = Math.ceil(Math.random() * 10);
    let arrOfRandomNums = [];

    // Create random numbers inside the file
    for (let j = 0; j < randomLines; j++) {
      let randomNumsInFile = Math.ceil(Math.random() * 100);
      arrOfRandomNums.push(randomNumsInFile);
    }

    // Join numbers into lines and write to file
    let data = arrOfRandomNums.join("\n");
    fs.writeFileSync(`${dirPath}/${i + 1}.txt`, data);
  }

  // -------------------------------
  // READ ALL FILES INTO ARRAYS OF LINES
  // -------------------------------
  let fileLines = arrOfFiles.map((file, idx) => {
    let data = fs.readFileSync(`${dirPath}/${idx + 1}.txt`, "utf-8");
    return data.split("\n"); // convert file into array of lines
  });

  // Will store the final merged lines
  let result = [];

  // How many lines to take from each file on each round
  let takeCount = 1;

  // Continue until *all files* become empty
  while (true) {
    let nothingToTake = true; // assume empty, check inside

    // Loop each file
    for (let f = 0; f < fileLines.length; f++) {
      // Take 'takeCount' lines from the current file
      for (let k = 0; k < takeCount; k++) {
        if (fileLines[f].length > 0) {
          nothingToTake = false; // still have data
          result.push(fileLines[f].shift()); // remove + store first line
        }
      }
    }

    // If all files are empty → stop
    if (nothingToTake) break;

    // Next round: take more lines from each file
    takeCount++;
  }

  // -------------------------------
  // WRITE OUTPUT FILE
  // -------------------------------
  const outputPath = path.join(dirPath, "output.txt");
  fs.writeFileSync(outputPath, result.join("\n"));
};

fn();
