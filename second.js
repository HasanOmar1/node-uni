// חסן עומר + עיסא לואבנה

for (let i = 2; i < 237; i++) {
  let isPrime = true;

  for (let j = 2; j <= Math.sqrt(i); j++) {
    if (i % j === 0) isPrime = false;
  }

  if (isPrime) console.log(i);
}
