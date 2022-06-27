import { UserModel } from '../../model/user.js';
import bcrypt from 'bcryptjs';
import { createToken, loginValidate } from '../../utils/validate.js';
import { errorMessage } from '../../utils/error_message.js';

export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    loginValidate(username, password);
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(404).json({ error: errorMessage.invalidUser(username) });
      return;
    }
    const pwCheck = await bcrypt.compare(password, user.password);
    if (!pwCheck) {
      res.status(404).json({ error: errorMessage.invalidEmailPass });
      return;
    }
    const token = createToken(user);
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
    return;
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
