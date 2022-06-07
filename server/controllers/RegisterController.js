const queries = require("../queries/auth");

class RegisterController {
  static GetRegister(req, res) {
    try {
      res.status(200).json({
        title: "Register Page",
        message: "Please register first . . .",
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async PostRegister(req, res) {
    try {
      const data = req.body;
      const register = await queries.register(data);
      if (register.status === 400) {
        res.status(register.status).send({
          message: register.message,
        });
      } else if (register.status === 201) {
        res.status(register.status).send({
          message: register.message,
        });
      } else {
        return null;
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

module.exports = RegisterController;
