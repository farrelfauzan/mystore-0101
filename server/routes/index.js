const express = require("express");

const loginRouter = require("./login");
const registerRouter = require("./register");
const userRouter = require("./userRouter");
const forgotPasswordRouter = require("./forgotPassword");
const productRouter = require("./productRouter");

const tokenAuthorization = require("../middleware/tokenAuthorization");

const router = express.Router();

router.use(loginRouter);
router.use(userRouter);
router.use(registerRouter);
router.use(forgotPasswordRouter);
router.use(productRouter);
router.use(tokenAuthorization);

module.exports = router;
