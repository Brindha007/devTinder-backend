const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://dbrindha007:p4Cl7QWjyQD69Qha@namastenodejs.z8g17.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
