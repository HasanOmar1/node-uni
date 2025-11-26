const express = require("express");
const app = express();
// const port = 3000;
// If you care about making your app run on any computer or cloud (aka your environments), then you should use environment variables.
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// app.get("/*", (req, res) => {
//   res.send("NO");
// });
app.listen(port);
//callback is executed, once the app starts listening to specified port
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
