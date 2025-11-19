const http = require("http");

const server = http.createServer((req, res) => {
  // Get the URL and request method
  const { url, method } = req;

  console.log(url, method);

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page");
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Us Page");
  } else if (url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Contact Page");
  } else if (url === "/kuku") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Kuku page");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
