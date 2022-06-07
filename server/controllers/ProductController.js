const queries = require("../queries/product");

class productController {
  static async allProduct(req, res) {
    try {
      const result = await queries.getAllProduct();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }
}

module.exports = productController;
