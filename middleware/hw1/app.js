//  חסן עומר + עיסא לואבנה
const express = require("express");

const app = express();

const middleware1 = (req, res, next) => {
  console.log("Hello 1");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("Hello 2");
  next();
};

app.use(middleware1, middleware2);

app.use("/users", (req, res, next) => {
  res.send("<h1>Hello</h1> ");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from everywhere</h1> ");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
