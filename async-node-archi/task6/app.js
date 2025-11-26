const { readFile } = require("fs");

console.log("started a first task");
readFile(__dirname + "/content/text1.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  console.log("completed first task");
});
console.log("code end");
