const express = require("express");

const loginRouter = require("./login");
const forgotPasswordRouter = require("./forgotPassword");

const tokenAuthorization = require("../middleware/tokenAuthorization");

const router = express.Router();

router.use(loginRouter);
router.use(forgotPasswordRouter);
router.use(tokenAuthorization);

module.exports = router;
