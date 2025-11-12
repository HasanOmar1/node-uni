const http = require("http"); // Import Node.js core module
const fs = require("fs"); // import fs module

// read html file
let data = fs.readFileSync(__dirname + "/data/data.json", "utf-8");
console.log(data);

//  creating server
const server = http.createServer(function (req, res) {
  //handle incoming requests here..
  //   console.log(req);
  // write http header
  res.setHeader("Content-TYpe", "application/json");
  // write html to the client

  // sending JSON string
  res.end(data);
});

server.listen(3000); //listen for any incoming requests
console.log("Node.js web server at port 3000 is running..");
