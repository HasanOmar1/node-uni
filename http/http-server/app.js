const http = require("http");

const server = http.createServer(function (req, res) {
  // write http header
  res.setHeader("Content-Type", "text/html");
  // write html to the client
  res.write(`
		<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
				<h1>Heading</h1>
			</body>
		</html>
	`);
  res.end("Hello from the server");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
