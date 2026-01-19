const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

router.get("/", (req, res) => {
  if (req.session.user) {
    const query = "SELECT * FROM articles WHERE author_id = ?";
    db.query(query, [req.session.user.id], (err, results) => {
      if (err) return res.status(500).send("Error on server.");
      res.json(results);
    });
  } else {
    res.status(401).send("Not authorized");
  }
});

module.exports = router;
