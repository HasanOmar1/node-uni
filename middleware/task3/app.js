const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

//  req => middleware => res
// the first optional it a path

// in the following middleware will be executed for any route
// starting with /

app.use("/add-product", (req, res, next) => {
  console.log("In another middleware for add product!");
  res.send('<h1>The "Add Product" Page</h1>');
  // next cant be written here since we send response
  // so this middleware will be executed only for routes
  // starting with /add-product
});

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next(); // continue to the next middleware
});

// Note: when we write html we must write it properly
// including the structure
// here it is short for demo only!

// in the following middleware will be executed for any route
// starting with /add-product

// in the following middleware will be executed for any route
// starting with / but not for /add-product since it was already covered
app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>");
});
// the order is important!
// try to write /add-product middleware after the last /
// middleware
// since / includes /add-product, /add-product will not be executed

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
