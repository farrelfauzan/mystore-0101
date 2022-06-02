const express = require("express");
const ForgotPasswordController = require("../controllers/ForgotPasswordController");

const forgotPasswordRouter = express.Router();

forgotPasswordRouter
  .route("/forgot-password")
  .get(ForgotPasswordController.GetForgotPassword)
  .post(ForgotPasswordController.PostForgotPassword);

module.exports = forgotPasswordRouter;
