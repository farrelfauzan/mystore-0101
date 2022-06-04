const bcrypt = require("bcrypt");

class utility {
  static hashPassword(password) {
    let hashPwd = bcrypt.hashSync(password, 10);
    return hashPwd;
  }
}

module.exports = utility;
