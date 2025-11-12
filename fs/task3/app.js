// we define here template in HTML.
// later we will see template engines to do it easier

const http = require("http"); // Import Node.js core module
const fs = require("fs"); // import fs module

// read html file as a string
let html = fs.readFileSync(__dirname + "/templates/page.html", "utf8");
const heading = "HTML File as Response";
html = html.replace("{h1-heading}", heading);
console.log(typeof html);

//  creating server
const server = http.createServer((req, res) => {
  // write http header
  res.writeHead(200, { "Content-Type": "text/html" });
  // write html file to the client
  res.end(html);
});

server.listen(3000, () => console.log("Server is running on port 3000"));
