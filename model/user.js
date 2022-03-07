import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  currency: { type: String, required: true },
  createdAt: Number,
  token: String,
});

export const UserModel = mongoose.model('User', userSchema);
