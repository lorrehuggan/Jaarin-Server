import { UserModel } from '../../model/user.js';
import bcrypt from 'bcryptjs';
import { signupValidate } from '../../utils/validate.js';
import jwt from 'jsonwebtoken';
import { JWT } from '../../utils/check_auth.js';

export const Create = async (req, res) => {
  const { username, email, currency, password, confirmPassword } = req.body;

  try {
    signupValidate(password, confirmPassword, username, email, currency);

    const user = await UserModel.findOne({ username });
    if (user) {
      throw new Error('username is taken');
    }

    const isEmail = await UserModel.findOne({ email });
    if (isEmail) {
      throw new Error('user with email already signed up');
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
    const res = await createUser.save();
    const token = createToken(res);
    res.json({ ...res.doc, id: res._id, token });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      currency: user.currency,
    },
    JWT,
    { expiresIn: '1h' }
  );
};
