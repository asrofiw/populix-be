const db = require("../config/database");

module.exports = {
  create: async (data = []) => {
    try {
      return await db
        .promise()
        .query(
          `INSERT INTO user (email, password, name, role_id) values (?,?,?,?)`,
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
  update: async (id, data) => {
    try {
      return await db
        .promise()
        .query(`UPDATE user SET ? WHERE id = ${id}`, data);
    } catch (err) {
      throw err;
    }
  },
  destroy: async (id) => {
    try {
      return await db.promise().query(`DELETE FROM user WHERE id = ?`, [id]);
    } catch (err) {
      throw err;
    }
  },
};
