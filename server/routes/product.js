const express = require("express");
const ProductController = require("../controllers/ProductController");
// const { multerSetup } = require("../helper/multer");

const productController = express.Router();

productController.route("/store").get(ProductController.GetProduct);
productController.route("/createProduct").post(ProductController.createProduct)

module.exports = productController;
