const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// executed for any request
app.use((req, res, next) => {
  console.log("In the middleware!");
  // allows the request to continue to the next middleware

  next();
});

app.use((req, res, next) => {
  console.log("In another middleware!");
  // !res. send() sends the response and closes the connection, whereas with response. write() you can send multiple responses
  // !use only one send per request on the last middleware
  // !you still can use res.write and res.end as without express
  res.send("<h1>Hello from Express 2!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
