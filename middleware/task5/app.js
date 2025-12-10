const express = require("express");
const logger = require("./logger");

const app = express();
const port = 3000;

const auth = (req, res, next) => {
  if (currentUser) {
    next();
  } else {
    res.status(401).json({ message: "User is not authorized" });
  }
};

// Middleware for processing JSON request bodies
app.use(express.json());
app.use(logger);

// Example of a list of users for checking authorization
const users = [
  { username: "admin123", password: "admin123", role: "admin" },
  { username: "admin234", password: "admin234", role: "admin" },
  { username: "user123", password: "user123", role: "user" },
  { username: "user678", password: "user678", role: "user" },
];

// Storage of the currently authorized user
let currentUser = null;

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({ message: "Fill all fields!" });
  }
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    currentUser = user;
    res.json({
      message: "Logged in successfully",
      data: { username, role: user.role },
    });
  } else {
    res.status(401).json({ message: "Invalid login or password" });
  }
});

app.post("/logout", (req, res) => {
  currentUser = null;
  res.json({ message: "Logout successfully" });
});

app.use("/admin", auth);
app.use("/user", auth);

app.get("/admin", (req, res) => {
  if (currentUser.role !== "admin") {
    res.status(403).json({ message: "Access Denied: insufficient rights" });
  }

  res.json({ message: "Welcome to the admin panel" });
});

app.get("/user/profile", (req, res) => {
  if (currentUser) {
    res.json({
      message: `Welcome ${currentUser.username}, this is your profile `,
    });
  }
  res.json({ message: "Login first" });
});

app.get("/", (req, res) => {
  if (currentUser) {
    res.send('Main page. <a href="/logout">Logout</a>');
  } else {
    res.send('Main page. <a href="/login">Login</a>');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`The application is running on port ${port}`);
});
