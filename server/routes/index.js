const express = require("express");

const loginRouter = require("./login");
const registerRouter = require("./register");
const userRouter = require("./userRouter");
const forgotPasswordRouter = require("./forgotPassword");
const productRouter = require("./product");
const adminRouter = require("./admin");

const { TokenAuthorization, AdminAuthorization } = require("../middleware/");

const router = express.Router();

router.use(loginRouter);
router.use(registerRouter);
router.use(forgotPasswordRouter);
router.use(userRouter);
router.use(productRouter);
router.use(TokenAuthorization);
router.use(AdminAuthorization);
router.use(adminRouter);

module.exports = router;
