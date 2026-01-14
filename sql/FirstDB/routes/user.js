const express = require("express");
const router = express.Router();
//routes/user.js
const dbSingleton = require("../dbSingleton");
const bcrypt = require("bcrypt");

// Execute a query to the database
const db = dbSingleton.getConnection();

router.get("/", (req, res) => {
  const query = " SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// POST /users

router.post("/", (req, res) => {
  let { username, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    // Hashing password with salt
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) throw err;
      // Save hashedPassword to database
      password = hashedPassword;

      const query =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(query, [username, email, password], (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json({ message: "User added!", id: results.insertId });
      });
    });
  });
});

// POST /users/login
router.post("/login", (req, res) => {
  let { email, password } = req.body;

  const query = "select * from users where email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send(err);

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Email or password is incorrect" });
      }

      res.json({ message: "Logged in successfully", user });
    });
  });
});

// PUT /users/id

router.put("/:id", (req, res) => {
  const { id } = req.params;
  let { username, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) throw err;
      // Save hashedPassword to database
      password = hashedPassword;
      const query =
        "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
      db.query(query, [username, email, password, id], (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json({ message: "User updated!" });
      });
    });
  });
});

// DELETE /users/id

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "User deleted!" });
  });
});

module.exports = router;
