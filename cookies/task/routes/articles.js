const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();
const multer = require("multer");
const path = require("path");

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

// File storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name - 1707412345678.jpg
  },
});
const upload = multer({ storage: storage });

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    console.log(req.session.user);
    next();
  } else {
    res.status(401).send("Authorization required.");
  }
};

router.post("/", isAuthenticated, upload.single("image"), (req, res) => {
  const { title, content } = req.body;
  const id = req.session.user.id;
  // Check if the file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required!" });
  }

  // Get information about the file
  const imageUrl = `/uploads/${req.file.filename}`;
  const query =
    "INSERT INTO articles (title, content, author_id, imageUrl) VALUES (?, ?, ? , ?)";
  db.query(query, [title, content, id, imageUrl], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      message: "Article added!",
      id: results.insertId,
      article: {
        title,
        content,
        author_id: id,
        imageUrl,
      },
    });
  });
});

module.exports = router;
