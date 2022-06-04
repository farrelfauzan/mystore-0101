const express = require("express");

const loginRouter = require("./login");
const userRouter = require("./userRouter");
// const registerRouter = require("./register");
const forgotPasswordRouter = require("./forgotPassword");

const tokenAuthorization = require("../middleware/tokenAuthorization");

const router = express.Router();

router.use(loginRouter);
router.use(userRouter);
// router.use(registerRouter);
router.use(forgotPasswordRouter);
router.use(tokenAuthorization);

module.exports = router;
