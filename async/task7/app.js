const fs = require("fs");

// top level code
setTimeout(() => console.log("Timer 1 end"), 0);
fs.readFile(
  "text1.txt",
  // call back function -> in event loop
  () => {
    setTimeout(() => console.log("Timer 2 end"), 0);
    setTimeout(() => console.log("Timer 3 end"), 2000);
    console.log("IO 1 completed");
  }
);

console.log("code end");

// code end
// timer 1 end
// IO 1 completed
// Timer 2 end
// Timer 3 end
