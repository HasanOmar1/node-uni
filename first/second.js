// חסן עומר + עיסא לואבנה

const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

for (let i = 2; i < 237; i++) {
  if (isPrime(i)) console.log(i);
}

// for (let i = 2; i < 237; i++) {
//   let isPrime = true;

//   for (let j = 2; j <= Math.sqrt(i); j++) {
//     if (i % j === 0) isPrime = false;
//   }

//   if (isPrime) console.log(i);
// }
