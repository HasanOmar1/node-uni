const express = require("express");
const router = express.Router();
//routes/user.js
const dbSingleton = require("../dbSingleton");

// Execute a query to the database
const db = dbSingleton.getConnection();

//  show all products
//  GET /products
router.get("/", (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

//  show product with id
//  GET /users/id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Product =", product: results });
  });
});

//  add product
//  POST /products
router.post("/", (req, res) => {
  const { id, name, price } = req.body;
  const query = "INSERT INTO products (id, name, price) VALUES (?, ?, ?)";
  db.query(query, [id, name, price], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Product added!", id: results.insertId });
  });
});

//  update product with id
//  PUT /products/id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const query = "UPDATE products SET name = ?, price = ? WHERE id = ?";
  db.query(query, [name, price, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Produt updated!" });
  });
});

//  delete product with id
//  DELETE /produts/id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "product deleted!" });
  });
});

module.exports = router;
