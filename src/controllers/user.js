const Joi = require("joi");
const bcrypt = require("bcrypt");
const { responseError, responseOk } = require("../helpers/response");
const { create, findOneByID, update, destroy } = require("../models/user");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        role_id: Joi.number().integer().required(),
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
        return responseError(res, 400, error.message, "validate");
      }
      const hashPassword = bcrypt.hashSync(
        value.password,
        bcrypt.genSaltSync(10)
      );

      const result = await create([
        value.email,
        hashPassword,
        value.name,
        value.role_id,
      ]);

      return responseOk(res, "Success", {
        id: result[0].insertId,
        ...req.body,
        password: undefined,
      });
    } catch (err) {
      return next(err);
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().integer().required(),
      });

      const { error, value } = schema.validate(req.params);
      if (error) {
        return responseError(res, 400, error.message, "validate");
      }

      const [result] = await findOneByID(value.id);

      if (!result[0]) {
        return responseError(
          res,
          404,
          `User with id ${value.id} not found`,
          "not found"
        );
      }

      return responseOk(res, "Found", { ...result[0], password: undefined });
    } catch (err) {
      return next(err);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().integer().required(),
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(8).optional(),
        role_id: Joi.number().integer().optional(),
      });

      const { error, value } = schema.validate({ ...req.params, ...req.body });
      if (error) {
        return responseError(res, 400, error.message, "validate");
      }

      const [user] = await findOneByID(value.id);

      if (!user[0]) {
        return responseError(
          res,
          404,
          `User with id ${value.id} not found`,
          "not found"
        );
      }

      const dataUpdate = {
        id: undefined,
        ...value,
      };

      await update(value.id, dataUpdate);

      return responseOk(res, "Data updated", {
        ...user[0],
        ...dataUpdate,
        password: undefined,
      });
    } catch (err) {
      return next(err);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().integer().required(),
      });

      const { error, value } = schema.validate(req.params);
      if (error) {
        return responseError(res, 400, error.message, "validate");
      }

      const [user] = await findOneByID(value.id);

      if (!user[0]) {
        return responseError(
          res,
          404,
          `User with id ${value.id} not found`,
          "not found"
        );
      }

      await destroy(value.id);

      return responseOk(res, "Data deleted");
    } catch (err) {
      return next(err);
    }
  },
};
