require("dotenv").config();
const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

conn
  .promise()
  .query("CREATE DATABASE IF NOT EXISTS populix;")
  .then(() => console.log(`Database populix created.`))
  .catch((err) => console.log(err));

conn.end();
