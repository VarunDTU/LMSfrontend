import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("Connecting to MongoDB");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
