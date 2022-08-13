const db = require("../config/database");

module.exports = {
  findAll: async () => {
    try {
      return await db.promise().query(`SELECT * FROM role;`);
    } catch (err) {
      throw err;
    }
  },
};
