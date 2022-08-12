require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const conn = require("./src/config/database");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use("/", (_req, res, _next) => {
  return res.status(200).send({
    status: true,
    message: "Running server",
  });
});

app.listen(8080, () => {
  conn.connect((err) => {
    if (err) {
      console.log("error connecting to database " + err.message);
      return;
    }

    console.log("database connected as id " + conn.threadId);
    console.log("Application running on port 8080");
  });
});
