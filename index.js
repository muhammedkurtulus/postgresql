const express = require("express");
const app = express();
const port = 3001;

const user_model = require("./user-model");

app.use(express.json());
app.use(function (req, res, next) {
  next();
});

app.get("/", (req, res) => {
  user_model
    .getUsers()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/", (req, res) => {
  user_model
    .createUser(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/", (req, res) => {
  user_model
    .deleteUser(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}.`);
});
