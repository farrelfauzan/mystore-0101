const { upload } = require("../../helper/upload");
const { bucketFirebase } = require("../../firebase");
const db = require("../../models");
const queryProduct = db.products;

module.exports = {
  getAllProducts: async () => {
    const productAttributes = ["product_id", "name", "imageUrl", "category", "description", "price"];
    const query = {
      where: { deletedAt: null },
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
    // const { path } = dataUpload;
    const productId = dataBody.product_id;
    const query = {
      where: { product_id: productId },
    };

    const objData = {};

    // const link = await upload({
    //   bucketFirebase,
    //   filename: dataUpload.filename,
    //   path,
    // });

    const data = await queryProduct.findOne({
      product_id: productId,
    });

    if (data) {
      const editProduct = await queryProduct.update(
        {
          product_id: productId,
          name: dataBody.name,
          category: dataBody.category,
          // imageUrl: link,
          description: dataBody.description,
          price: dataBody.price,
        },
        query
      );
      objData = {
        product_id: editProduct.dataValues.product_id,
        name: editProduct.dataValues.name,
        category: editProduct.dataValues.category,
        // imageUrl: product.dataValues.imageUrl,
        description: editProduct.dataValues.description,
        price: editProduct.dataValues.price,
      };

      console.log(editProduct);
      console.log(productId);
      return objData.dataProduct;
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
