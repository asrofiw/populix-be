const { findAll } = require("../models/role");
const { responseOk } = require("../helpers/response");

module.exports = {
  listRole: async (_req, res, next) => {
    try {
      const [result] = await findAll();

      return responseOk(res, 200, result);
    } catch (err) {
      return next(err);
    }
  },
};
