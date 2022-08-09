const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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
  console.log("Application running on port 8080");
});
