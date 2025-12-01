const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

const users = JSON.parse(fs.readFileSync(__dirname + "/users.json"));

// get all users
app.get("/api/users", (req, res) => {
  res.send(users);
});

// filter users by age
app.get("/api/users/filter", (req, res) => {
  const { minAge, maxAge } = req.query;
  const usersByAge = users.filter((e) => {
    return e.age > Number(minAge) && e.age < Number(maxAge);
  });

  if (usersByAge.length > 0) {
    res.send(usersByAge);
  } else {
    res.status(404).send("No Users found");
  }
});

// get user by id
app.get("/api/users/:id", (req, res) => {
  const userById = users.filter((e) => e.id === Number(req.params.id));
  if (userById.length > 0) {
    res.send(userById);
  } else {
    res.status(404).send("User does not exist");
  }
});

app.get("/user/:id", (req, res) => {
  const userById = users.filter((e) => e.id === Number(req.params.id));

  //   const { id, name, email, age } = userById;
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
