const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("Users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  });

  const hashPassword = (password) => {
    let hashPwd = bcrypt.hashSync(password, 10);
    return hashPwd;
  };

  const comparePassword = (password, dbPassword) => {
    let isPasswordValid = bcrypt.compareSync(password, dbPassword);
    return isPasswordValid;
  };

  const generateToken = (payload) => {
    let data = {
      user_id: payload.user_id,
      username: payload.username,
      email: payload.email,
    };
    const secret = "MySecret";
    let token = jwt.sign(data, secret);
    return token;
  };

  const authenticateToken = (token) => {
    const secret = "MySecret";
    let data = jwt.verify(token, secret);
    return data;
  };

  const login = async (data) => {
    try {
      const logIn = await Users.findOne({
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
        let isPasswordValid = comparePassword(data.password, dbPassword);
        if (!isPasswordValid) {
          resultObj.message = "Wrong password !";
        } else {
          resultObj.success = true;
          resultObj.data = logIn.dataValues;
          return generateToken(resultObj.data);
        }
      }
      return Promise.resolve(resultObj);
    } catch (error) {
      return Promise.reject({ message: error });
    }
  };

  const forgotPassword = async (data) => {
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
  };

  return { Users, authenticateToken, login, forgotPassword };
};
