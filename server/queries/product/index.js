const db = require("../../models");
const utility = require("../../utility");
const query = db.products;

module.exports = {
  getAllProduct: async () => {
    try {
      const productAttributes = [
        "product_id",
        "name",
        "imageUrl",
        "category",
        "description",
        "price",
      ];

      return await query.findAll({
        attributes: productAttributes,
        // include:[
        //     {
        //         model: Biodata,
        //         attributes: ['address']
        //     }
        // ]
      });
    } catch (error) {
      throw error;
    }
  },

  //   createUser: async (data) => {
  //     const hashedPass = utility.hashPassword(data.password);
  //     try {
  //       await query.create({
  //         username: data.username,
  //         email: data.email,
  //         password: hashedPass,
  //       });
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
};
