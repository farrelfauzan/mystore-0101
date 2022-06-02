const queries = require('../queries/auth')

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
      const logIn = await queries.login(data);
      res.status(200).json({
        title: "Login Page",
        details: { token: logIn },
      });
    } catch (error) {
      res.status(error).json({ message: error });
    }
  }
}

module.exports = LoginController;
