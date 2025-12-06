const express = require("express");
const { products } = require("./data");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/products", (req, res) => {
  let { name, minPrice, maxPrice, limit } = req.query;

  let filteredProducts = [...products];
  if (name) {
    filteredProducts = filteredProducts.filter((d) =>
      d.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }

  if (minPrice && maxPrice && +minPrice > +maxPrice) {
    temp = minPrice;
    minPrice = maxPrice;
    maxPrice = temp;
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter((d) => d.price > +minPrice);
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((d) => d.price < +maxPrice);
  }
  if (limit) {
    filteredProducts = filteredProducts.slice(0, +limit);
  }

  res.send(filteredProducts);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
