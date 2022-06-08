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
}

module.exports = ProductController;
