const db = require("../models");
const Users = db.users;

function tokenAuthorization(req, res, next) {
  const getToken = req.headers.authorization;
  if (!getToken) {
    res.status(401).json({
      message: "Need token to process, please login !",
    });
  } else {
    let data = Users.authenticateToken(getToken);
    req.dataUsers = data;
    next();
  }
}

module.exports = tokenAuthorization;
