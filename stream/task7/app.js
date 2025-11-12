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

  let counter = 0;
  for (let i = 1; i < arrOfFiles.length; i++) {
    let arrOfLines = [];
    let dataByPerLine = fs.readFileSync(`${dirPath}/${i}.txt`, "utf-8");
    arrOfLines.push(dataByPerLine);
    for (let j = 0; j < arrOfLines.length; j++) {}
    console.table(arrOfLines);
    //   let data = arrOfLines.join("\n");
    //   console.log(data);
    //   let split = data.split("\n");

    // fs.appendFileSync(`${dirPath}/output.txt`, split[c] + "\n");
    // }
  }
};

fn();
