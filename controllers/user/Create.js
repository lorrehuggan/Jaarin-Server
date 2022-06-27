import { UserModel } from '../../model/user.js';
import bcrypt from 'bcryptjs';
import { createToken, signupValidate } from '../../utils/validate.js';

export const Create = async (req, res) => {
  const { username, email, currency, password, confirmPassword } = req.body;

  try {
    signupValidate(password, confirmPassword, username, email, currency);

    const user = await UserModel.findOne({ username });
    if (user) {
      res.status(404).json({ error: 'username is taken' });
      return;
    }

    const isEmail = await UserModel.findOne({ email });
    if (isEmail) {
      res.status().json({ error: 'user with email already signed up' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createUser = new UserModel({
      username,
      email,
      currency,
      password: hashedPassword,
      jobs: [],
      createdAt: new Date(),
    });
    const createdUser = await createUser.save();
    const token = createToken(createdUser);
    res.status(200).json({ id: createdUser._id, token });
    return;
  } catch (error) {
    res.json({ error: error.message });
  }
};
