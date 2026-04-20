import mongoose from "mongoose";

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing. Add it to your .env file.");
  }

  mongoose.set("strictQuery", true);

  const connection = await mongoose.connect(mongoUri);

  console.log(`MongoDB connected: ${connection.connection.host}`);
}

export default connectDB;
