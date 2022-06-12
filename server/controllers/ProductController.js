const queries = require("../queries/product");

class ProductController {
  static async GetProduct(_, res) {
    try {
      const data = await queries.getAllProducts();
      res.status(200).send({ product: data });
    } catch (error) {
      return error;
    }
  }

  static async createProduct(req, res) {
    try {
      const dataUpload = req.file;
      const dataBody = req.body;

      const result = await queries.createProduct(dataBody, dataUpload);
      res.status(201).json({
        message: "Success create product !",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  static async editProduct(req, res) {
    try {
      const dataBody = req.body;

      const result = await queries.editProduct(dataBody);
      res.status(201).json({
        message: "Success change product !",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const dataBody = req.body;
      const result = await queries.deleteProduct(dataBody);
      res.status(201).json({
        message: "Success delete product!",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }
}

module.exports = ProductController;
