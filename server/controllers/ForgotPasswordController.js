const db = require("../models");
const Users = db.users;

class ForgotPasswordController {
  static GetForgotPassword(req, res) {
    try {
      res.status(200).json({
        title: "Forgot Password Page",
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async PostForgotPassword(req, res) {
    try {
      const data = req.body;
      await Users.forgotPassword(data);
      res.status(200).json({
        title: "Forgot Password Page",
        message: "Success updated password !",
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = ForgotPasswordController;
