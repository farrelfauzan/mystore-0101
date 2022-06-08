const express = require("express");
const productController = require("../controllers/ProductController");

const productRouter = express.Router();

productRouter.route("/store").get(productController.allProduct);

module.exports = productRouter;
