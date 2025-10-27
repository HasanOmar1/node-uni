// חסן עומר + עיסא לואבנה

const arr = [5, 10, 15, 0, 20, 25, 0, 3, 4, 0, 5, 0, 1, 0]; // 5 zeros

const zerosCounts = arr.filter((e) => e === 0).length;
// const zerosCounts = arr.filter((e) => Boolean(e) === false).length;
console.log(zerosCounts);
