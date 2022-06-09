const queries = require("../queries/auth");

class LoginController {
  static GetLogin(_, res) {
    res.status(200).json({
      title: "Login Page",
      message: "Please login to continue . . .",
    });
  }

  static async PostLogin(req, res) {
    try {
      const data = req.body;
      const logIn = await queries.login(data);
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
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = LoginController;
