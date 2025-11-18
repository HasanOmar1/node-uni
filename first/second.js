// חסן עומר + עיסא לואבנה

// Function to check if a number is prime
const isPrime = (num) => {
  // Loop from 2 up to √num (optimization)
  for (let i = 2; i <= Math.sqrt(num); i++) {
    // If divisible, it's not prime
    if (num % i === 0) return false;
  }
  // If loop finishes → number is prime
  return true;
};

// Loop from 2 to 236 and print all prime numbers
for (let i = 2; i < 237; i++) {
  if (isPrime(i)) console.log(i);
}
