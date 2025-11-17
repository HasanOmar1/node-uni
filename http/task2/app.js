const http = require("http"); // Import Node.js core module
const fs = require("fs"); // import file module
const path = require("path");
const dirPath = path.join(__dirname, "/templates");

// read html file
const file2Send = fs.readFileSync(`${dirPath}/page.html`);

//  creating server
const server = http.createServer(function (req, res) {
  //handle incoming requests here..
  //   console.log(req);
  // write http header
  res.setHeader("Content-Type", "text/html");
  // write html file to the client
  res.end(file2Send);
});

server.listen(3000); //listen for any incoming requests
console.log("Node.js web server at port 3000 is running..");
