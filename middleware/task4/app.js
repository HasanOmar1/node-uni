const express = require("express");
const logger = require("./logger");
const authorize = require("./authorize");

const app = express();
const port = process.env.PORT || 3000;

//  req => middleware => res
app.use([logger, authorize]);
// api/home/about/products
app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
