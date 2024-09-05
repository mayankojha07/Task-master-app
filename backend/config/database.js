const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB CONNECTED SUCCESSFULLY!"))
    .catch((error) => {
      console.log("DB CONNECTION ERROR -> ", error);
      process.exit(1);
    });
};

module.exports = connectToDB;
