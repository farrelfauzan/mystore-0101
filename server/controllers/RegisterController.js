const queries = require("../queries/auth");
const db = require("../models");



class RegisterController {
  static GetRegister(req, res) {
    res.status(200).json({
      title: "Register Page",
      message: "Please register to continue . . .",
    });
  }

  static async PostRegister(req, res) {
    try {
      const { username, email, password, password2, gender, address } = req.body;

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

const dataUser= {email:email, password:password, username:username, gender:gender, address:address}      
const dataEmailExist = await queries.emailExist(email)
      
      if (dataEmailExist) {
        console.log("ini dataemail", dataEmailExist)
        return res.status(422).json({
          message: "Email already exist",
        });
      }

      const regist=  queries.register(dataUser)

      if(regist){
        res.status(200).json({
            success: true,
            message: "Registration successful",
          });

      }

    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = RegisterController;
