const http = require("http");
const url = require("url");

//  creating server
const server = http.createServer(function (req, res) {
  //handle incoming requests here..

  const pathName = req.url;
  console.log(pathName);

  // call parse() method using url module
  console.log(url.parse(pathName, true));

  const { query, path } = url.parse(pathName, true);
  console.log(query);
  console.log(path);
  res.end("Task#1");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
console.log("Node.js web server at port 3000 is running..");
