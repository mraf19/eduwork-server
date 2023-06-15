const mongoose = require("mongoose");
const { dbUrl } = require("../app/config");

mongoose.set("strictQuery", true);

mongoose
  .connect(dbUrl, {
    dbName: "eduwork",
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

module.exports = db;
