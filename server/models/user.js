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
      let logIn = await Users.findOne({
        where: { email: data.email },
      });
      if (!logIn) {
        return Promise.reject("User not found !");
      } else {
        let dbPassword = logIn.dataValues.password;
        let isPasswordValid = comparePassword(data.password, dbPassword);
        if (!isPasswordValid) {
          return Promise.reject("Wrong password !");
        } else {
          const log = logIn.dataValues;
          return generateToken(log);
        }
      }
    } catch (error) {
      Promise.reject(error);
    }
  };

  const forgotPassword = async (data) => {
    try {
      const encryptPassword = bcrypt.hashPassword(data.password);
      await Users.update({
        password: encryptPassword,
        where: { email: data.email },
      });
    } catch (error) {
      Promise.reject(error);
    }
  };

  return { Users, authenticateToken, register, login, forgotPassword };
};
