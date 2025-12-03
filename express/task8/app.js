const express = require("express");
const fs = require("fs");
const data = require("./data");

const app = express();
const port = process.env.PORT || 3000;

app.get("/products/:productPrice", (req, res) => {
  const { productPrice } = req.params;
  const products = data.products.filter((d) => d.price > productPrice);
  res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
