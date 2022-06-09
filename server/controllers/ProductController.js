const queries = require("../queries/product");
const db = require("../models");
const queryProduct = db.products;
class ProductController {
  static async GetProduct(_, res) {
    try {
      const data = await queries.getAllProducts();
      res.status(200).send({ product: data });
    } catch (error) {
      return error;
    }
  }

  static async createProduct (req, res) {
    try {
      const upload = await queries.uploadIUmage()
      const result = await queryProduct.create({
        name: data.name,
        category: data.category,
        imageUrl: upload,
        description: data.description,
        price: data.price
      })

      res.status(201).json({
        message: "Success create product",
        result
      })
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error
      })
    }
  }
}

module.exports = ProductController;
