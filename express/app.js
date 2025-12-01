const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const { products } = require("./data");
app.get("/", (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>');
});

app.get("/api/products/all", (req, res) => {
  res.send(products);
});
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});
app.get("/api/products/:productID", (req, res) => {
  // console.log(req)
  // console.log(req.params)
  const { productID } = req.params;

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  if (!singleProduct) {
    return res.status(404).send("Product Does Not Exist");
  }

  return res.json(singleProduct);
});
// try: http://localhost:3000/api/products/333/reviews/4
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello world");
});

// query params
// try: http://localhost:3000/api/kuku?search=albany
// try: http://localhost:3000/api/kuku?search=albany&limit=2
app.get("/api/kuku", (req, res) => {
  console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // return is a must - otherwise we get error because of 2 status codes
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ success: true, data: [] });
  }
  res.status(200).json(sortedProducts);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
