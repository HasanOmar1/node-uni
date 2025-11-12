// callback hell
// use promises or async-await instead

const { readFile, writeFile, readFileSync } = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "/text");

console.log("start");
readFileSync(`${dirPath}/first.txt`, "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = result;
  readFile(`${dirPath}/second.txt`, "utf8", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = result;
    writeFile(
      `${dirPath}/result-async.txt`,
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("done with this task");
      }
    );
  });
});
console.log("starting next task");
