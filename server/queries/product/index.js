const { upload } = require("../../helper/upload");
const db = require("../../models");
const queryProduct = db.products;

module.exports = {
  getAllProducts: async () => {
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
  },

  createProduct: async () => {
    const data = req.body
    let product = await queryProduct.create({
      name: data.name,
      category: data.category,
      description: data.description,
      price: data.price
    })

    return product
  },

  uploadIUmage: async () => {
    const {path, originalname} = req.file
      let link = await upload({
        bucketfirebase,
        filename: originalname,
        path
      })

    return link
  }
  
};
