const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.json());

app.use(
  session({
    secret: "your_secret_key", // Key for signing session data (must be unique)
    resave: false, // Do not save the session if the data has not changed
    saveUninitialized: true, // Create a session even for unlogged in users
    cookie: { secure: false }, // If true, sessions only work over HTTPS
    // cookie: { maxAge: 3600000 } // Cookie lifetime (1 hour)
  }),
);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
