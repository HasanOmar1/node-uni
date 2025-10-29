// app.js
// const math = require("mathjs");
import * as math from "mathjs";

// An example of using some mathematical functions
const a = 3;
const b = 4;

const sum = math.add(a, b);
const product = math.multiply(a, b);
const power = math.pow(a, b);
const sqrt = math.sqrt(b);

console.log(`Sum of ${a} and ${b} is:`, sum);
console.log(`Product of ${a} and ${b} is:`, product);
console.log(`${a} raised to the power of ${b} is:`, power);
console.log(`Square root of ${b} is:`, sqrt);
