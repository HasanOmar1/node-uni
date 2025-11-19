// חסן עומר + עיסא לואבנה

// arr of numbers with some zeros
const arr = [5, 10, 15, 0, 20, 25, 0, 3, 4, 0, 5, 0, 1, 0]; // 5 zeros

// returns number of zeros in the arr
// solution 1
const zerosCounts = arr.filter((e) => e === 0).length;

// solution 2
// const zerosCounts = arr.filter((e) => Boolean(e) === false).length;
console.log(zerosCounts);
