const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "/text");

const read = fs.readFile(`${dirPath}/input.txt`, "utf8");
const newD = fs.appendFile(read, "\nProcessed by Node.js");
fs.writeFile(`${dirPath}/output.txt`, newD);

// const input = fs.readFile(`${dirPath}/input.txt`, "utf8");
// fs.appendFile(`${dirPath}/input.txt`, "\nProcessed by Node.js");

// fs.writeFile(`${dirPath}/output.txt`, input);
