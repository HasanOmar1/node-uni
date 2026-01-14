const bcrypt = require("bcrypt");

function f1(i, strPassword) {
  // Generate salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    console.log(i + ") Salt: " + salt);
    // Hashing password with salt
    bcrypt.hash(strPassword, salt, (err, hashedPassword) => {
      if (err) throw err;
      // Save hashedPassword to database
      console.log(i + ") Hashed password with salt:", hashedPassword);
    });
  });
}

let i;
for (i = 1; i <= 5; i++) f1(i, "kuku");
