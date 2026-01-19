const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "your_secret_key", // Key for signing session data (must be unique)
    resave: false, // Do not save the session if the data has not changed
    saveUninitialized: true, // Create a session even for unlogged in users
    cookie: { secure: false }, // If true, sessions only work over HTTPS
    // cookie: { maxAge: 3600000 } // Cookie lifetime (1 hour)
  }),
);

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`You've visited this page ${req.session.views} times`);
  } else {
    req.session.views = 1;
    res.send("Welcome! This is your first visit.");
  }
  console.log(req.session);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error terminating session.");
    }
    res.send("Session ended.");
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
