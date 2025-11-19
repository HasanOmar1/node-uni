//  חסן עומר + עיסא לואבנה

// 1. Import necessary built-in Node.js modules
const http = require("http"); // For creating the web server
const fs = require("fs"); // "File System" - for reading files
const path = require("path"); // For handling file paths safely across OS (Windows vs Mac/Linux)

const server = http.createServer(function (req, res) {
  let url = req.url;

  if (url === "/" || url === "/page.html") {
    const htmlPath = path.join(__dirname, "templates", "page.html");
    const fileStream = fs.createReadStream(htmlPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    fileStream.pipe(res);
  } else if (url === "/about.html") {
    const htmlPath = path.join(__dirname, "templates", "about.html");
    const fileStream = fs.createReadStream(htmlPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    fileStream.pipe(res);
  } else if (url === "/contact.html") {
    const htmlPath = path.join(__dirname, "templates", "contact.html");
    const fileStream = fs.createReadStream(htmlPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    fileStream.pipe(res);
  } else if (req.url.match("[.]css$")) {
    const cssPath = path.join(__dirname, req.url);
    const fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
  } else if (req.url.match("[.]jpg$")) {
    const imgPath = path.join(__dirname, req.url);
    const fileStream = fs.createReadStream(imgPath);

    res.writeHead(200, { "Content-Type": "image/jpg" });

    fileStream.pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>"); // Send string immediately and close connection
  }
});

server.listen(3000);

console.log("Node.js web server at port 3000 is running..");
