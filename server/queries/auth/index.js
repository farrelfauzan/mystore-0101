const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const query = db.users;
const queryBiodata = db.biodata;
const { HashPassword } = require("../../utility");

module.exports = {
  login: async (data) => {
    const objError = {
      status: 0,
      message: "",
    };
    if (!data.email || !data.password) {
      objError.status = 400;
      objError.message = "Input must be filled !";
    } else {
      const user = await query.findOne({
        where: { email: data.email },
      });
      if (!user) {
        objError.status = 404;
        objError.message = "User with this email not found !";
      } else {
        const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data.email);
        if (!emailValid) {
          objError.status = 401;
          objError.message = "Wrong email !";
        } else {
          const passwordValid = bcrypt.compareSync(
            data.password,
            user.dataValues.password
          );
          if (!passwordValid) {
            objError.status = 401;
            objError.message = "Wrong password !";
          } else {
            if (data.email === user.dataValues.email && passwordValid) {
              const userBiodata = await queryBiodata.findOne({
                where: { user_id: user.dataValues.user_id },
              });
              const secret = "MySecret";
              const dataUser = {
                user_id: user.dataValues.user_id,
                username: user.dataValues.username,
                email: user.dataValues.email,
                gender: userBiodata.dataValues.gender,
                address: userBiodata.dataValues.address,
              };
              const dataToken = jwt.sign(dataUser, secret);
              objError.status = 200;
              objError.message = "Login success !";
              objError.user = dataUser;
              objError.token = dataToken;
            } else {
              objError.status = 400;
              objError.message = "Error password or email";
            }
          }
        }
      }
    }
    const objSend = {
      status: objError.status,
      message: objError.message,
      user: objError.user,
      token: objError.token,
    };
    return objSend;
  },

  register: async (data) => {
    const objError = {
      status: 0,
      message: "",
    };
    if (
      data.username === "" ||
      data.email === "" ||
      data.password === "" ||
      data.gender === "" ||
      data.address === ""
    ) {
      objError.status = 400;
      objError.message = "Input must be filled !";
    } else {
      const checkUser = await query.findOne({
        where: { username: data.username },
      });
      if (checkUser) {
        objError.status = 400;
        objError.message = "Username already registered !";
      } else {
        const checkEmail = await query.findOne({
          where: { email: data.email },
        });
        if (checkEmail) {
          objError.status = 400;
          objError.message = "Email already registered !";
        } else {
          const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
            data.email
          );
          if (!emailValid) {
            objError.status = 400;
            objError.message = "Invalid email format !";
          } else {
            const checkPassword =
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm.test(
                data.password
              );
            if (!checkPassword) {
              objError.status = 400;
              objError.message =
                "Password should have one upper case, one lower case, one digit, one special character, and minimum eight in length !";
            } else {
              const encryptPassword = HashPassword(data.password);
              if (!checkUser && !checkEmail && checkPassword && emailValid) {
                const createUser = await query.create({
                  username: data.username,
                  email: data.email,
                  password: encryptPassword,
                });
                await queryBiodata.create({
                  user_id: createUser.dataValues.user_id,
                  gender: data.gender,
                  address: data.address,
                });
                objError.status = 201;
                objError.message = "Register success !";
              } else {
                objError.status = 400;
                objError.message = "Register error !";
              }
            }
          }
        }
      }
    }
    const objSend = {
      status: objError.status,
      message: objError.message,
    };
    return objSend;
  },

  forgotPassword: async (data) => {
    const objError = {
      status: 0,
      message: "",
    };
    if (!data.email || !data.password) {
      objError.status = 400;
      objError.message = "Input must be filled !";
    } else {
      const user = await query.findOne({
        where: { email: data.email },
      });
      if (!user) {
        objError.status = 404;
        objError.message = "User not found !";
      } else {
        if (data.password === "") {
          objError.status = 401;
          objError.message = "Password must be filled !";
        } else {
          const checkPassword =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm.test(
              data.password
            );
          if (!checkPassword) {
            objError.status = 400;
            objError.message =
              "Password should have one upper case, one lower case, one digit, one special character, and minimum eight in length !";
          } else {
            const encryptPassword = HashPassword(data.password);
            const time = Date.now();
            if (data.email === user.dataValues.email && checkPassword) {
              await query.update(
                {
                  password: encryptPassword,
                  updatedAt: time,
                },
                { where: { email: user.dataValues.email } }
              );
              objError.status = 200;
              objError.message = "Success change password !";
            } else {
              objError.status = 400;
              objError.message = "Error password or email";
            }
          }
        }
      }
    }
    const objSend = {
      status: objError.status,
      message: objError.message,
    };
    return objSend;
  },

  authenticateToken: (token) => {
    const secret = "MySecret";
    const data = jwt.verify(token, secret);
    return data;
  },
};
