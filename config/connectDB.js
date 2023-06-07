const mongoose = require("mongoose");
require("dotenv").config;
// connction DaTA BASE

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("DATA BASE Connected");
  } catch (error) {
    handleError();
  }
};
module.exports = connectDB;
