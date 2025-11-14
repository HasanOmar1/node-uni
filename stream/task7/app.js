const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "text");

const arrOfFiles = ["1.txt", "2.txt", "3.txt"];

const fn = () => {
  let maxLines = 0;

  // --- CREATE INPUT FILES (random content) ---
  for (let i = 0; i < arrOfFiles.length; i++) {
    let randomLines = Math.ceil(Math.random() * 20);
    let arrOfRandomNums = [];

    maxLines = Math.max(maxLines, randomLines);

    for (let j = 0; j < randomLines; j++) {
      let randomNumsInFile = Math.ceil(Math.random() * 100);
      arrOfRandomNums.push(randomNumsInFile);
    }

    let data = arrOfRandomNums.join("\n");
    fs.writeFileSync(`${dirPath}/${i + 1}.txt`, data, "utf8");
  }

  // --- READ ALL FILES INTO ARRAYS OF LINES ---
  let fileLines = arrOfFiles.map((file, idx) => {
    let data = fs.readFileSync(`${dirPath}/${idx + 1}.txt`, "utf-8");
    return data.length === 0 ? [] : data.split("\n");
  });

  let result = [];

  let takeCount = 1; // how many lines to take this round

  while (true) {
    let nothingToTake = true;

    for (let f = 0; f < fileLines.length; f++) {
      for (let k = 0; k < takeCount; k++) {
        if (fileLines[f].length > 0) {
          nothingToTake = false;
          result.push(fileLines[f].shift()); // remove first line
        }
      }
    }

    if (nothingToTake) break; // all files empty
    takeCount++; // next round take more lines
  }

  // --- WRITE OUTPUT FILE ---
  const outputPath = path.join(dirPath, "output.txt");
  fs.writeFileSync(outputPath, result.join("\n"));
};

fn();
