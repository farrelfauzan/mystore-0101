const express = require("express");

const loginRouter = require("./login");
const registerRouter = require("./register");
const userRouter = require("./userRouter");
const forgotPasswordRouter = require("./forgotPassword");

const { TokenAuthorization } = require("../middleware/");

const router = express.Router();

router.use(loginRouter);
router.use(registerRouter);
router.use(forgotPasswordRouter);
router.use(userRouter);
router.use(TokenAuthorization);

module.exports = router;
