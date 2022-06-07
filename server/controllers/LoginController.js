const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const queries = require("../queries/auth");

class LoginController {
  static GetLogin(req, res) {
    res.status(200).json({
      title: "Login Page",
      message: "Please login to continue . . .",
    });
  }

  static async PostLogin(req, res) {
    try {
      const data = req.body;
      const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data.email);
      if (!data.email) {
        return res.status(400).send({
          message: "Email  must be filled !",
        });
      } else if (!data.password) {
        return res.status(400).send({
          message: "Password must be filled !",
        });
      } else if (!emailValid) {
        return res.status(401).json({
          message: "Wrong email format !",
        });
      }

      const logIn = await queries.login(data);
      const passwordValid = bcrypt.compareSync(
        data.password,
        logIn.dataValues.password
      );
      if (data.email !== logIn.dataValues.email) {
        return res.status(401).json({
          message: "Wrong email !",
        });
      } else if (!passwordValid) {
        return res.status(401).json({
          message: "Wrong password !",
        });
      } else if (data.email === logIn.dataValues.email && passwordValid) {
        const secret = "MySecret";
        const dataUser = {
          user_id: logIn.dataValues.user_id,
          username: logIn.dataValues.username,
          email: logIn.dataValues.email,
        };
        const dataToken = jwt.sign(dataUser, secret);
        return res.status(200).json({
          user: dataUser,
          token: dataToken,
        });
      } else {
        return res.status(401).json({
          message: "Error password or email",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = LoginController;
