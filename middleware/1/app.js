const express = require("express");
const { products } = require("./products");

const app = express();
app.use(express.json());

let idCounter = products.length;

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const item = products.find((e) => e.id === +id);
  if (!item) {
    res.status(404);
    res.send("Product not found");
  }
  res.send(item);
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((e) => e.id === +id);

  if (productIndex === -1) {
    return res
      .status(404)
      .json({ error: `product with id: ${req.params.id} is not found` });
  }
  products.splice(productIndex, 1);

  res.json({ message: `Product with id: ${req.params.id} was deleted` });
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || typeof price !== "number") {
    return res.status(400).json({ error: "Incorrect type of data" });
  }

  const product = { id: ++idCounter, name, price };
  products.push(product);
  res.status(201).json({
    message: "Product was added",
    product: { id: product.id, name, price },
  });
});

app.listen(3000, () => console.log("Listening to PORT 3000"));
