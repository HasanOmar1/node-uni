// 1. Import necessary built-in Node.js modules
const http = require("http"); // For creating the web server
const url = require("url"); // For parsing URL strings
const fs = require("fs"); // "File System" - for reading files
const path = require("path"); // For handling file paths safely across OS (Windows vs Mac/Linux)

// 2. Create the server
// The callback function triggers every time a user makes a request
const server = http.createServer(function (req, res) {
  // --- URL Parsing ---
  // Get the full URL the user requested (e.g., "/about?id=1")
  let pathNameFull = req.url;

  // Parse the URL string into an object to separate the path from query parameters
  // 'true' parses the query string (e.g., ?id=1) into an object
  let pathNameObj = url.parse(pathNameFull, true);
  let pathName = pathNameObj.pathname;

  // --- Routing Logic ---

  // CASE 1: root URL (Home Page)
  if (pathName === "/") {
    // Construct the absolute path to the HTML file
    // __dirname is the directory of the current script
    const htmlPath = path.join(__dirname, "templates", "page.html");

    // Create a Read Stream (reads file in chunks, better for memory)
    const fileStream = fs.createReadStream(htmlPath, "UTF-8");

    // Write the HTTP header: Status 200 (OK) and Content-Type
    res.writeHead(200, { "Content-Type": "text/html" });

    // Pipe the file stream directly to the response stream
    fileStream.pipe(res);

    // CASE 2: CSS Files
    // Uses Regex to check if the URL ends with ".css"
  } else if (req.url.match("[.]css$")) {
    const cssPath = path.join(__dirname, "templates", req.url);

    const fileStream = fs.createReadStream(cssPath, "UTF-8");

    // Note the Content-Type is text/css
    res.writeHead(200, { "Content-Type": "text/css" });

    fileStream.pipe(res);

    // CASE 3: JPG Images
    // Uses Regex to check if the URL ends with ".jpg"
  } else if (req.url.match("[.]jpg$")) {
    const imgPath = path.join(__dirname, "templates", req.url);

    // IMPORTANT: No "UTF-8" encoding here because images are binary data
    const fileStream = fs.createReadStream(imgPath);

    res.writeHead(200, { "Content-Type": "image/jpg" });

    fileStream.pipe(res);

    // CASE 4: 404 Not Found
    // If the route doesn't match any of the above
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>"); // Send string immediately and close connection
  }
});

// 3. Start the server
server.listen(3000); // Server will listen on localhost:3000

console.log("Node.js web server at port 3000 is running..");
