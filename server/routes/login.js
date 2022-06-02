const express = require("express");
const LoginController = require("../controllers/LoginController");

const loginRouter = express.Router();

loginRouter
  .route("/login")
  .get(LoginController.GetLogin)
  .post(LoginController.PostLogin);

module.exports = loginRouter;
