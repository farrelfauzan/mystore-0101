const express = require("express");
const AdminController = require("../controllers/AdminController");

const adminRouter = express.Router();

adminRouter.route("/admin").get(AdminController.GetAdmin);

module.exports = adminRouter;
