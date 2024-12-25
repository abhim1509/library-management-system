import mongoose from "mongoose";

export const initializeDb = () => {
  // MongoDB connection string (local)
  const MONGO_URI = "mongodb://127.0.0.1:27017/lms";

  // Connect to MongoDB
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
};

export const closeDbConnection = async () => {
  await mongoose.connection.close();
};
