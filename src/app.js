require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { responseError } = require("../src/helpers/response");

// routes
const authRoutes = require("../src/routes/auth");
const userRoutes = require("../src/routes/user");
const roleRoutes = require("../src/routes/role");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  responseError(res, 500, "Internal Server Error", error.message);
});

module.exports = app;
