const express = require("express");
const data = require("./data");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/products", (req, res) => {
  const { name, minPrice, maxPrice, limit } = req.query;

  let products = [];
  if (name) {
    products = data.products.filter((d) =>
      d.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (minPrice) {
    products = data.products.filter((d) => d.price > minPrice);
  }
  console.log("**********");

  if (maxPrice) {
    products = data.products.filter((d) => d.price < maxPrice);
  }
  console.log(products);

  res.send(products);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
