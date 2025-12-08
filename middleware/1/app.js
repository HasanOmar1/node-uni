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
  console.log(item);
  res.send(item);
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const item = products.find((e) => e.id === +id);
  let index = products.indexOf(item);

  if (!item) {
    res.status(404);
    res.send("Product not found");
  }
  products.splice(index, 1);

  res.send("Item removed");
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  const obj = { id: ++idCounter, name, price };
  products.push(obj);
  res.send(products);
});

app.listen(3000, () => console.log("Listening to 3000"));
