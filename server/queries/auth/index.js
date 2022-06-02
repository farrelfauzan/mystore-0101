const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const query = db.users;
const { hashPassword } = require("../../utility");

module.exports = {
  login: async (data) => {
    try {
      let logIn = await query.findOne({
        where: { email: data.email },
      });
      const resultObj = {
        success: false,
        message: "",
      };
      if (!logIn) {
        return (resultObj.message = "User not found !");
      } else {
        let dbPassword = logIn.dataValues.password;
        let isPasswordValid = bcrypt.compareSync(data.password, dbPassword);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
          return (resultObj.message = "Wrong password !");
        } else {
          resultObj.success = true;
          const secret = "MySecret";
          const payload = {
            user_id: logIn.dataValues.user_id,
            username: logIn.dataValues.username,
            email: logIn.dataValues.email,
          };
          resultObj.data = payload;
          const result = jwt.sign(resultObj.data, secret);

          return result;
        }
      }
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
        return Promise.reject("Email not found !");
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
