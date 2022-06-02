const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const query = db.users;
const { hashPassword } = require('../../utility')

module.exports ={
    login:  async (data) => {
        try {
          let logIn = await query.findOne({
            where: { email: data.email },
          });
          const resultObj = {
            success: false,
            message: "",
          };
          if (!logIn) {
            resultObj.message = "User not found !";
          } else {
            let dbPassword = logIn.dataValues.password;
            let isPasswordValid = bcrypt.compare(data.password, dbPassword);
            if (!isPasswordValid) {
                resultObj.message = "Wrong password !";
            } else {
                resultObj.success = true;
                resultObj.data = logIn.dataValues;
                const result = {
                    'token': jwt.sign(resultObj.data, secret)
                }
              return result
            //   return generateToken(log);
            }
          }
        } catch (error) {
          Promise.reject({message: error});
        }
    },

    forgotPassword: async (data) => {
        try {
            const encryptPassword = hashPassword(data.password);
            const time = Date.now();
            const checkUser = await Users.findOne({
              where: { email: data.email },
            });
            if (!checkUser) {
              return Promise.reject("Email not found !");
            } else {
              await Users.update(
                {
                  password: encryptPassword,
                  updatedAt: time,
                },
                { where: { email: checkUser.dataValues.email } }
              );
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
}