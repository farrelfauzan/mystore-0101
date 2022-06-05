const queries = require("../queries/auth");
const utility = require("../utility");
const db = require("../models");
const Biodata = db.biodata;
const User = db.users;

class RegisterController {
  static GetRegister(req, res) {
    res.status(200).json({
      title: "Register Page",
      message: "Please register to continue . . .",
    });
  }

  static async PostRegister(req, res) {
    try {
      const { username, email, password, password2 } = req.body;

      if (!email) {
        return res.status(400).send({
          message: "Email must be filled !",
        });
      } else if (!username) {
        return res.status(400).send({
          message: "Username must be filled !",
        });
      } else if (!password) {
        return res.status(400).send({
          message: "Password must be filled !",
        });
      } else if (password.length < 6) {
        return res.status(400).send({
          message: "Password should be at least 6 characters",
        });
      } else if (password != password2) {
        return res.status(400).send({
          message: "Password do not match",
        });
      }

      const emailExist = await User.findOne({
        where: {
          email: email,
        },
      });

      if (emailExist) {
        return res.status(422).json({
          message: "Email already exist",
        });
      }
      const newUser = {
        username: username,
        email: email,
        password: utility.hashPassword(password),
      };
      const data = await User.create(newUser);
      await Biodata.create({
        gender: req.body.gender,
        address: req.body.address,
        user_id: data.user_id,
      });
      res.status(200).json({
        success: true,
        message: "Registration successful",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = RegisterController;
