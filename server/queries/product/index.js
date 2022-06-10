const { upload } = require("../../helper/upload");
const { bucketFirebase } = require("../../firebase");
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

  createProduct: async (dataBody, dataUpload) => {
    const { path } = dataUpload;
    const objData = {};
    const link = await upload({
      bucketFirebase,
      filename: dataUpload.filename,
      path,
    });
    if (link) {
      const product = await queryProduct.create({
        name: dataBody.name,
        category: dataBody.category,
        imageUrl: link,
        description: dataBody.description,
        price: dataBody.price,
      });
      objData.dataProduct = {
        product_id: product.dataValues.product_id,
        name: product.dataValues.name,
        category: product.dataValues.category,
        imageUrl: product.dataValues.imageUrl,
        description: product.dataValues.description,
        price: product.dataValues.price,
      };
      return objData.dataProduct;
    }
  },
};
