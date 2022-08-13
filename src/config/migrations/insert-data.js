require("dotenv").config();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conn
  .promise()
  .query(`INSERT INTO role (name) VALUES ('Super Admin'),('Admin');`)
  .then(() => console.log("Rows role added"))
  .catch((err) => console.log(err));

const passDefault = "12345678#";
const hashPassword = bcrypt.hashSync(passDefault, bcrypt.genSaltSync(10));

conn
  .promise()
  .query(
    `INSERT INTO user (email, password, name, role_id) VALUES
      ('super-admin@admin.com','${hashPassword}','Super Admin', 1),
      ('admin@admin.com','${hashPassword}','Admin', 2);`
  )
  .then(() =>
    console.log(`Rows user added
  user 1: super-admin@admin.com
  user 2: admin@admin.com
  password default: ${passDefault}`)
  )
  .catch((err) => console.log(err));

conn.end();
