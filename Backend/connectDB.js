const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI1);
    console.log("Connect to user db success");
  } catch (error) {
    console.log(error);
  }
};

connect();
