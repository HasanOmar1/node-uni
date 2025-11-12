const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "/text");

const input = fs.readFileSync(`${dirPath}/input.txt`, "utf8");
const upper = input.toUpperCase();

fs.writeFileSync(`${dirPath}/output.txt`, upper);
