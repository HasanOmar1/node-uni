//  חסן עומר + עיסא לואבנה

// 1. Import necessary built-in Node.js modules
const http = require("http"); // For creating the web server
const fs = require("fs"); // "File System" - for reading files
const path = require("path"); // For handling file paths safely across OS (Windows vs Mac/Linux)

// creates server
const server = http.createServer(function (req, res) {
  // takes url
  let url = req.url;

  // if url is / or /page.html then you will see page.html
  if (url === "/" || url === "/page.html") {
    const htmlPath = path.join(__dirname, "templates", "page.html");
    const fileStream = fs.createReadStream(htmlPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    fileStream.pipe(res);
    // if url is /about.html then you will see about.html
  } else if (url === "/about.html") {
    const htmlPath = path.join(__dirname, "templates", "about.html");
    const fileStream = fs.createReadStream(htmlPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    fileStream.pipe(res);
    // if url is /contact.html then you will see contact.html
  } else if (url === "/contact.html") {
    const htmlPath = path.join(__dirname, "templates", "contact.html");
    const fileStream = fs.createReadStream(htmlPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    fileStream.pipe(res);
    // this allows us to use external css
  } else if (req.url.match("[.]css$")) {
    const cssPath = path.join(__dirname, req.url);
    const fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
    // this allows us to use external jpg images
  } else if (req.url.match("[.]jpg$")) {
    const imgPath = path.join(__dirname, req.url);
    const fileStream = fs.createReadStream(imgPath);
    res.writeHead(200, { "Content-Type": "image/jpg" });
    fileStream.pipe(res);
    // if the url is different from the ones above you will see 404 error page
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(3000);

console.log("Node.js web server at port 3000 is running..");
