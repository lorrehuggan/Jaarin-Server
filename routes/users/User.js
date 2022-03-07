import { UserModel } from '../../model/user.js';

export const User = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.body.id });
    res.status(200).json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};
