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
          if (!logIn) {
            return Promise.reject("User not found !");
          } else {
            let dbPassword = logIn.dataValues.password;
            let isPasswordValid = bcrypt.compare(data.password, dbPassword);
            if (!isPasswordValid) {
              return Promise.reject("Wrong password !");
            } else {
              const log = logIn.dataValues;
              const secret = "My Secret"
              const result = {
                  'token': jwt.sign(log, secret)
              }
              return result
            //   return generateToken(log);
            }
          }
        } catch (error) {
          Promise.reject(error);
        }
    },

    forgotPassword: async (data) => {
        try {
          const encryptPassword = hashPassword(data.password);
          await query.update({
            password: encryptPassword,
            where: { email: data.email },
          });
        } catch (error) {
          Promise.reject(error);
        }
    },

    authenticateToken: (token) => {
        const secret = "MySecret";
        let data = jwt.verify(token, secret);
        return data;
    },
}