//  חסן עומר + עיסא לואבנה

const express = require("express");
const router = express.Router();
const data = require("../data");

// --- Validation Middleware ---
const validateProduct = (req, res, next) => {
  const { id, name, price, stock } = req.body;
  const isPostRequest = req.method === "POST";

  // 1. Check required fields (Only mandatory for POST)
  if (
    isPostRequest &&
    (!id || !name || price === undefined || stock === undefined)
  ) {
    return res
      .status(400)
      .json({ message: "All fields (id, name, price, stock) are required" });
  }

  // 2. Check for Unique ID (Only for POST)
  if (isPostRequest) {
    const productExists = data.products.find((item) => item.id === id);
    if (productExists) {
      return res
        .status(400)
        .json({ message: `Product with ID: ${id} already exists` });
    }
  }

  // 3. Validate Price (Must be greater than 0)
  if (price !== undefined && (typeof price !== "number" || price <= 0)) {
    return res
      .status(400)
      .json({ message: "Price must be a number greater than 0" });
  }

  // 4. Validate Stock (Must be 0 or more)
  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    return res
      .status(400)
      .json({ message: "Stock must be a positive number (0 or higher)" });
  }

  // If everything is valid, move to the next function (the route handler)
  next();
};

// --- Routes ---

// GET /api/products - Get all products
router.get("/", (req, res) => {
  res.json({ products: data.products });
});

// GET /api/products/:id - Get product by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = data.products.find((item) => item.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: `Product with ID: ${id} not found` });
  }
});

// POST /api/products - Add product using Middleware
router.post("/", validateProduct, (req, res) => {
  const { id, name, price, stock } = req.body;
  const productData = { id, name, price, stock };
  data.products.push(productData);
  res.status(201).json({ message: `Product added`, products: data.products });
});

// PUT /api/products/:id - Update product using Middleware
router.put("/:id", validateProduct, (req, res) => {
  const { id } = req.params;
  const productInd = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (productInd !== -1) {
    // Merge existing data with new data from req.body
    data.products[productInd] = { ...data.products[productInd], ...req.body };
    res.json({
      message: `Product with ID: ${id} updated`,
      products: data.products,
    });
  } else {
    res.status(404).json({ message: `Product with ID: ${id} not found` });
  }
});

// DELETE /api/products/:id - Delete product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productInd = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (productInd !== -1) {
    data.products.splice(productInd, 1);
    res.json({
      message: `Product with ID: ${id} deleted`,
      products: data.products,
    });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});

module.exports = router;
