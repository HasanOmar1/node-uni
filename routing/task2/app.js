const http = require("http"); // Import Node.js core module
const url = require("url");
const fs = require("fs");
const home = fs.readFileSync(`${__dirname}/templates/home.html`);
const books = fs.readFileSync(`${__dirname}/templates/books.html`);
const book = fs.readFileSync(`${__dirname}/templates/book.html`);

const server = http.createServer(function (req, res) {
  let pathNameFull = req.url;
  console.log({ pathNameFull }); //full url

  pathNameObj = url.parse(pathNameFull, true);
  console.log({ pathNameObj }); //url as object

  pathName = pathNameObj.pathname;
  console.log({ pathName }); //without query

  if (pathName === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(home);
  } else if (pathName === "/books") {
    res.setHeader("Content-Type", "text/html");
    res.end(books);
  } else if (pathName === "/book") {
    res.setHeader("Content-Type", "text/html");
    res.end(book);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }

  console.log("******************");
});
server.listen(3000); //listen for any incoming requests
console.log("Node.js web server at port 3000 is running..");
