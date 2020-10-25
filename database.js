let mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connec = await mongoose.connect(
      "mongodb+srv://gomycode123:gomycode123@cluster0.cshm8.mongodb.net/checkpointMongoose?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );
    console.log(`MongoDB connected: ${connec.connection.host}`);
  } catch (error) {
    console.log(`Error found: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
