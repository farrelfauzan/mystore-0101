const express = require("express");
const ProductController = require("../controllers/ProductController");

const productController = express.Router();

productController.route("/store").get(ProductController.GetProduct);

module.exports = productController;
