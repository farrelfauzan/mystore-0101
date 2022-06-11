const express = require("express");
const ProductController = require("../controllers/ProductController");
const { multerSetup } = require("../helper/multer");

const productController = express.Router();

productController.route("/store").get(ProductController.GetProduct);
productController.route("/createProduct").post(multerSetup.single("imageUrl"), ProductController.createProduct);
productController.route("/deleteProduct").post(ProductController.deleteProduct);

module.exports = productController;
