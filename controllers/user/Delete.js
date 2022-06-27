import { UserModel } from '../../model/user.js';
import { checkAuth } from '../../utils/check_auth.js';

export const Delete = async (req, res) => {
  const user = checkAuth(req.headers.authorization, res);
  if (user.id !== id) {
    res.status(404).json({ error: 'not authorized' });
    return;
  }
  try {
    const remove = UserModel.findByIdAndDelete(id);
    res.status(200).json({ user: remove });
    return;
  } catch (error) {
    console.log(error.message);
  }
};
