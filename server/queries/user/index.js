const db = require("../../models");
const utility = require("../../utility");
const query = db.users;

module.exports = {
  getAllUser: async () => {
    try {
      const userAttributes = ["user_id", "username", "email"];

      return await query.findAll({
        attributes: userAttributes,
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

  createUser: async (data) => {
    const hashedPass = utility.hashPassword(data.password);
    try {
      await query.create({
        username: data.username,
        email: data.email,
        password: hashedPass,
      });
    } catch (error) {
      throw error;
    }
  },
};
