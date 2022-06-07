const bcrypt = require("bcrypt");

class Utility {
  static HashPassword(password) {
    const hashPwd = bcrypt.hashSync(password, 10);
    return hashPwd;
  }
}

module.exports = Utility;
