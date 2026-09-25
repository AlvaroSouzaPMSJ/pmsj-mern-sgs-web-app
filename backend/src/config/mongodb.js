import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  try {
    const mongoURI = env.DATABASE.URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI not defined");
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;