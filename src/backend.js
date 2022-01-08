const express = require("express");
const connect = require("./configs/db");

const userController = require("./controllers/user.controller");

const app = express();

app.use(express.json());

app.use("/users", userController)

app.listen(3001, async () => {
  await connect();
  console.log("Hai friends i am listening 3001")
})