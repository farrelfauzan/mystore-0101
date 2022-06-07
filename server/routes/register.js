const express = require("express");
const RegisterController = require("../controllers/RegisterController");

const registerRouter = express.Router();

registerRouter
  .route("/register")
  .get(RegisterController.GetRegister)
  .post(RegisterController.PostRegister);

module.exports = registerRouter;
