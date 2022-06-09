const queries = require("../queries/auth");

class Middleware {
  static TokenAuthorization(req, res, next) {
    const getToken = req.headers.authorization;
    if (!getToken) {
      res.status(401).json({
        message: "Need token to process, please login !",
      });
    } else if (getToken.length > 200 && getToken.includes("eyJhbGciOi")) {
      // let data = queries.authenticateToken(getToken);
      // req.dataUser = data;
      next();
    } else {
      res.status(401).json({
        message: "Need token to process, please login !",
      });
    }
  }

  static AdminAuthorization(req, res, next) {
    const getToken = req.headers.authorization;
    let data = queries.authenticateToken(getToken);
    if (data.role === "admin") {
      next();
    } else {
      res.status(401).json({
        message: "Only admin can access this page !",
      });
    }
  }
}

module.exports = Middleware;
