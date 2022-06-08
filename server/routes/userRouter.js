const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/getAllUser").get(userController.allUser);

userRouter.route("/createUser").post(userController.createUser);

module.exports = userRouter;
