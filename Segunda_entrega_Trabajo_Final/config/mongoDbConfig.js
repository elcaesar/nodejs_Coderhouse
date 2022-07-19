const mongoose = require("mongoose");

const dbConnectionMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONN);
    console.log("MongoDB Atlas conectado");
  } catch (error) {
    console.log(error);
    throw new Error("Error con la base de datos");
  }
};

module.exports = {
  dbConnectionMongodb,
};
