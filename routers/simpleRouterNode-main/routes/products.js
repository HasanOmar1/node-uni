const express = require("express");
const router = express.Router();
const path = require("path");

const data = require("./data");

// GET /products
router.get("/", (req, res) => {
  res.json({ data });
});

// GET /products/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const filId = data.products.filter((p) => p.id === +id);
  res.json({ filId });
});

// POST /products
router.post("/", (req, res) => {
  const { id, name, price } = req.body;
  const obj = { id, name, price };
  data.products.push(obj);
  res.status(201).json({ message: "Product added", data: obj });
});

// PUT/DELETE /products/:id
router
  .put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const prodInd = data.products.findIndex((item) => item.id === Number(id));
    if (prodInd !== -1) {
      const updatedProduct = { ...data.products[prodInd], name, price };
      data.products[prodInd] = updatedProduct;
      res
        .status(201)
        .json({ message: "Product updated", data: updatedProduct });
    } else {
      res.status(404).sendFile(errorPage);
    }
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    const prodInd = data.products.findIndex((item) => item.id === Number(id));
    if (prodInd !== -1) {
      data.products.splice(prodInd, 1);
      res.status(201).json({ message: "Product deleted" });
    } else {
      res.status(404).sendFile(errorPage);
    }
  });

module.exports = router;
