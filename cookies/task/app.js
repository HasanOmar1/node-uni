const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.json());

const registerRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // For HTTPS use true
  }),
);

app.use("/user", registerRouter);
app.use("/articles", articlesRouter);

// app.get("/", (req, res) => {
//   console.log("helllllo");
// });

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
