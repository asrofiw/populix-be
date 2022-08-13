require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const conn = require("./src/config/database");

// routes
const authRoutes = require("./src/routes/auth");
const { responseError } = require("./src/helpers/response");

const app = express();
const { APP_PORT } = process.env;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  responseError(res, 500, "Internal Server Error", error.message);
});

app.listen(APP_PORT || 8080, () => {
  conn.connect((err) => {
    if (err) {
      console.log("error connecting to database " + err.message);
      return;
    }

    console.log("Database connected as id " + conn.threadId);
    console.log("Application running on port 8080");
  });
});
