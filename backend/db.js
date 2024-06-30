const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_URL)
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch((error) => {
    console.log(`Cloud not connected db` + error);
  });
