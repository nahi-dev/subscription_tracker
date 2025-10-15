import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";
if (!DB_URI) {
  throw new Error(
    "DB_URI is not defined in environment variables inside .env.<development/production>.local file"
  );
}
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};
export default connectToDatabase;
