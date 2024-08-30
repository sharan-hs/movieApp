const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const MONGO_DB_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.log("Error occurred connecting to Mongo DB", error);
  });
