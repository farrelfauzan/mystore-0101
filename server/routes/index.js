const express = require("express");

const loginRouter = require("./login");
const forgotPasswordRouter = require("./forgotPassword");
const userRouter = require('./userRouter')

const tokenAuthorization = require("../middleware/tokenAuthorization");

const router = express.Router();

router.use(userRouter);
router.use(loginRouter);
router.use(forgotPasswordRouter);
router.use(tokenAuthorization);

module.exports = router;
