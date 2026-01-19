const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();
const bcrypt = require("bcrypt");

// register
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return;

    bcrypt.hash(password, salt, (err, hashedPass) => {
      if (err) return;

      const query =
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
      db.query(query, [username, email, hashedPass], (err, result) => {
        if (err) {
          console.error("Error in database:", err);
          return res.status(500).send("Error registering!!");
        }
        res.status(201).send("User registered!!");
      });
    });
  });
});

// login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!req.session.user) {
    res.send("Logout first");
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send("Error on server.");

    if (results.length === 0) {
      return res.status(400).send("Invalid email or password.");
    }

    const user = results[0];
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) return res.status(500).send("Error during comparison.");
      if (isMatch) {
        req.session.user = user;
        res.send("You have successfully logged in.");
      } else {
        res.status(400).send("Invalid email or password.");
      }
    });
  });
});

// logout
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    console.log(req.session.user);
    next();
  } else {
    res.status(401).send("Authorization required.");
  }
};

router.get("/logout", isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error terminating session.");
    }
    res.send("Session ended.");
  });
});

module.exports = router;
