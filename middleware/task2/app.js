const express = require("express");
const logger = require("./logger");
const app = express();
const port = process.env.PORT || 3000;

//  req => middleware => res

app.use(logger);

// in the following logger will be executed for any route. we can add url
// as will be demonstrated later
// app.use('/api', logger)

app.get("/", (req, res) => {
  console.log("home");
  res.send("Home");
});
app.get("/about", (req, res) => {
  console.log("About");
  res.send("About");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
