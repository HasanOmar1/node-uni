//  חסן עומר + עיסא לואבנה
const express = require("express");
const logger = require("./logger");
const app = express();
const port = 3000;

// Use the logger middleware for all routes
app.use(logger);

// get route for "/"
app.get("/", (req, res) => {
  res.send("Welcome to the Homepage");
});

// middleware for admin route , if user is not admin then he cannot access the admin page
app.use("/admin", (req, res) => {
  const { user } = req.query;
  if (user !== "admin") res.status(403).send("Access denied");
  else {
    console.log("User Authorized");
    res.send("Welcome to the Admin Page");
  }
});

// public route
app.get("/public", (req, res) => {
  res.send("This is a Public Page");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
