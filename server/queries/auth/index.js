// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const query = db.users;
// const queryBiodata = db.biodata;
const { hashPassword } = require("../../utility");

module.exports = {
  login: async (data) => {
    try {
      const user = await query.findOne({
        where: { email: data.email },
      });
      return user;
    } catch (error) {
      return Promise.reject({ message: error });
    }
  },

  forgotPassword: async (data) => {
    try {
      const encryptPassword = hashPassword(data.password);
      const time = Date.now();
      const checkUser = await query.findOne({
        where: { email: data.email },
      });
      if (!checkUser) {
        return Promise.reject("User not found !");
      } else {
        if (data.password === "") {
          return Promise.reject("Password must be filled !");
        } else {
          await query.update(
            {
              password: encryptPassword,
              updatedAt: time,
            },
            { where: { email: checkUser.dataValues.email } }
          );
        }
      }
    } catch (error) {
      return Promise.reject({ message: error });
    }
  },

  authenticateToken: (token) => {
    const secret = "MySecret";
    let data = jwt.verify(token, secret);
    return data;
  },
};
