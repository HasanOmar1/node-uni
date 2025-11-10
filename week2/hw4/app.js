const fs = require("fs");

const files = [
  "1.txt",
  "2.txt",
  "3.txt",
  "4.txt",
  "5.txt",
  "6.txt",
  "7.txt",
  "8.txt",
  "9.txt",
];
const words = [];
const nums = [];

for (let i = 0; i < files.length; i++) {
  let randomLines = Math.ceil(Math.random() * 10);

  for (let j = 0; j < randomLines; j++) {
    nums.push(j);
  }

  for (let c = 0; c < nums.length; c++) {
    fs.appendFileSync(`${__dirname}/${files[i]}`, c + "\n");
  }
}

files.map((f) => {
  const text = fs.readFileSync(__dirname + "/" + f, "utf-8");
  const t = text.split("\n");
  for (let i = 0; i < f[0]; i++) {
    words.push(t[i]);
  }
});

console.log(words);

fs.writeFileSync(`${__dirname}/output.txt`, words.join("\n"));
