const jwt = require("jsonwebtoken");
const { responseError } = require("../helpers/response");

module.exports = {
  authorization: (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer ")) {
      let token = authorization.slice(7);
      try {
        token = jwt.verify(token, process.env.APP_KEY);
        if (token) {
          req.user = token;
        } else {
          return responseError(res, 401, "Unauthorized", "authorization");
        }
      } catch (err) {
        return responseError(res, 401, err.message, "token");
      }
    } else {
      return responseError(res, 401, "Authorization needed", "authorization");
    }
    return next();
  },
  authentication: (req, res, next) => {
    if (req.user.role_id !== 1) {
      return responseError(res, 403, "Forbidden access", "authentication");
    }
    return next();
  },
};
