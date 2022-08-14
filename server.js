const app = require("./src/app");
const conn = require("./src/config/database");

const { APP_PORT } = process.env;

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
