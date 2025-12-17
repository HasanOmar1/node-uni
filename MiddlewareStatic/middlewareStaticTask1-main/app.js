const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// ** Route for main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ** Route for CSS
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "style.css"));
});

// ** Route for JS
app.get("/js.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "js.js"));
});

// ** Route for image
app.get("/1.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "1.jpg"));
});

// Route for about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
