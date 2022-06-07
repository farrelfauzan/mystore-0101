const queries = require("../queries/auth");

class ForgotPasswordController {
  static GetForgotPassword(_, res) {
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
      const logIn = await queries.forgotPassword(data);
      if (logIn.status === 404) {
        res.status(logIn.status).send({
          message: logIn.message,
        });
      } else if (logIn.status === 400 || logIn.status === 401) {
        res.status(logIn.status).send({
          message: logIn.message,
        });
      } else if (logIn.status === 200) {
        res.status(logIn.status).send({
          message: logIn.message,
          user: logIn.user,
          token: logIn.token,
        });
      } else {
        return null;
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = ForgotPasswordController;
