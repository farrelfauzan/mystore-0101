const { upload } = require("../../helper/upload");
const { bucketFirebase } = require("../../firebase");
const db = require("../../models");
const queryProduct = db.products;

module.exports = {
  getAllProducts: async () => {
    const productAttributes = ["product_id", "name", "imageUrl", "category", "description", "price"];
    const query = {
      where: { deletedAt: null },
      order: [["updatedAt", "DESC"]],
    };
    const data = await queryProduct.findAll(query, {
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

  editProduct: async (dataBody) => {
    const productId = dataBody.product_id;
    const query = {
      where: { product_id: productId },
    };
    const data = await queryProduct.findOne({
      product_id: productId,
    });

    if (data) {
      const editProduct = await queryProduct.update(
        {
          name: dataBody.name,
          category: dataBody.category,
          description: dataBody.description,
          price: dataBody.price,
        },
        query
      );
      return editProduct;
    }
  },

  deleteProduct: async (dataBody) => {
    const productId = dataBody.product_id;
    const query = {
      where: { product_id: productId },
    };
    const data = await queryProduct.findOne({
      product_id: productId,
    });
    if (data) {
      const softDelete = await queryProduct.update(
        {
          deletedAt: Date.now(),
        },
        query
      );
      return softDelete;
    }
  },
};
