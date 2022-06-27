import { UserModel } from '../../model/user.js';
import { checkAuth } from '../../utils/check_auth.js';

export const User = async (req, res) => {
  const authUser = checkAuth(req.headers.authorization);
  console.log(authUser);
  try {
    const user = await UserModel.findById({ _id: req.query.id });
    res.status(200).json(user);
    return;
  } catch (error) {
    res.json({ error: error.message });
  }
};
