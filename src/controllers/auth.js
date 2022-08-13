const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { responseError, responseOk } = require("../helpers/response");
const { findOneByEmail } = require("../models/user");

module.exports = {
  login: async (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
        return responseError(res, 400, error.message, "validate");
      }

      const [result] = await findOneByEmail(value.email);

      const user = result[0];

      if (!user) {
        return responseError(
          res,
          404,
          `Email ${value.email} not found`,
          "not found"
        );
      }

      const isPassMatch = bcrypt.compareSync(value.password, user.password);

      if (!isPassMatch) {
        return responseError(res, 400, "Wrong password", "password");
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role_id: user.role_id,
        },
        process.env.APP_KEY,
        {
          expiresIn: "7d",
        }
      );

      return responseOk(res, "Success", {
        ...user,
        password: undefined,
        token,
      });
    } catch (err) {
      return next(err);
    }
  },
};
