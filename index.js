const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

let { users } = require("./state");

app.use(express.json());

/* BEGIN - create routes here */

app.use((req, res, next) => {
  next();
});

// the GET Method
app.get("/users", (req, res) => {
  res.json(users);
});

app.put("/users/:id", (req, res) => {
  console.log(req.body);
  res.json(users);
});

// the POST Method
app.post("/users", (req, res) => {
  users.push({
    _id: users.length + 1,
    ...req.body,
  });
  res.json({
    _id: users.length + 1,
    ...req.body,
  });
});

// the DELETE Method
app.delete("/users/:id", (req, res) => {
  let userId = req.params.id;
  let deletedUser = users.filter((obj) => obj._id !== parseInt(userId));
  console.log(deletedUser);
  res.send("User deleted");
});

/* END - create routes here */

app.get("/users/:id", (req, res) => {
  let userId = req.params.id;
  res.json(users.find((obj) => obj._id === parseInt(userId)));
});

// the PUT Method
app.put("/users/:id", (req, res) => {
  console.log(req.body);

  users = users.map((user) => {
    if (user._id === parseInt(req.params.id)) {
      return {
        _id: parseInt(req.params.id),
        ...req.body,
      };
    }
    return user;
  });
  res.json(req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
