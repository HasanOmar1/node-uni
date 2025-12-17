const express = require("express");
const logger = require("./logger");
const app = express();
const port = 3000;

app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome to the Homepage");
});

app.use("/admin", (req, res) => {
  const { user } = req.query;
  if (user !== "admin") res.status(403).send("Access denied");
  else {
    console.log("User Authorized");
    res.send("Welcome to the Admin Page");
  }
});

app.get("/public", (req, res) => {
  res.send("This is a Public Page");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
