import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const DB_AUTH = process.env.DB_AUTH;

export const connectDB = async (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
