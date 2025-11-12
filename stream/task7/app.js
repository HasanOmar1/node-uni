const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "/text");

const arrOfFiles = ["1.txt", , "2.txt"];

const fn = () => {
  for (let i = 1; i < arrOfFiles.length; i++) {
    let random = Math.ceil(Math.random() * 20);
    let arrOfRandomNums = [];
    for (let j = 0; j < random; j++) {
      let randomNumsInFile = Math.ceil(Math.random() * 100);
      arrOfRandomNums.push(randomNumsInFile);
    }
    let data = arrOfRandomNums.join("\n");
    // console.table(data);
    fs.writeFileSync(`${dirPath}/${i}.txt`, data);
    arrOfRandomNums = [];
  }

  let max = 0;

  for (let i = 1; i < arrOfFiles.length; i++) {
    let arrOfLines = [];
    let dataByPerLine = fs.readFileSync(`${dirPath}/${i}.txt`, "utf-8");
    console.log(dataByPerLine);
    console.log("****************");

    // arrOfLines.push(dataByPerLine);
    // console.table(arrOfLines);
    // console.log(dataByPerLine.length);
    // if (arrOfLines.length > max) {
    //   max = arrOfLines.length;
    // }

    // fs.appendFileSync(`${dirPath}/output.txt`, split[c] + "\n");
  }

  // console.log(max);
};

fn();
