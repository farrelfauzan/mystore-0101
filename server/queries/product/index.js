const db = require("../../models");
const queryProduct = db.products;

module.exports = {
  getAllProducts: async () => {
    try {
      const productAttributes = [
        "product_id",
        "name",
        "imageUrl",
        "category",
        "description",
        "price",
      ];
      const data = await queryProduct.findAll({
        attributes: productAttributes,
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
