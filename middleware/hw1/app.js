//  חסן עומר + עיסא לואבנה
const express = require("express");

const app = express();

// middleware 1 for logging "Hello 1" for all routes
const middleware1 = (req, res, next) => {
  console.log("Hello 1");
  next();
};

// middleware 2 for logging "Hello 1" for all routes
const middleware2 = (req, res, next) => {
  console.log("Hello 2");
  next();
};

// use both middlewares for all routes
app.use(middleware1, middleware2);

// middleware for /users route
app.use("/users", (req, res, next) => {
  res.send("<h1>Hello</h1> ");
});

// middleware for / route
app.use("/", (req, res, next) => {
  res.send("<h1>Hello from everywhere</h1> ");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
