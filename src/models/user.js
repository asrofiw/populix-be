const db = require("../config/database");

module.exports = {
  createUser: async (data = []) => {
    try {
      return await db
        .promise()
        .query(
          `INSERT INTO user (email, password, fullname, created_at, updated_at) values (?,?,?,?,?)`,
          data
        );
    } catch (err) {
      throw err;
    }
  },
  findOneByEmail: async (email) => {
    try {
      return await db
        .promise()
        .query(`SELECT * FROM user WHERE email = ? LIMIT 1`, [email]);
    } catch (err) {
      throw err;
    }
  },
  findOneByID: async (id) => {
    try {
      return await db
        .promise()
        .query(`SELECT * FROM user WHERE id = ? LIMIT 1`, [id]);
    } catch (err) {
      throw err;
    }
  },
};
