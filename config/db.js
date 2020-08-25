const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(
      `MongoDB connected to ${connection.connection.host} successfully`
    );
  } catch (error) {
    console.log(`Database Error:  ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
