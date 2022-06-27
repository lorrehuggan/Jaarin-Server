import { JobModel } from '../../model/job.js';
import { checkAuth } from '../../utils/check_auth.js';

export const Job = async (req, res) => {
  try {
    const user = checkAuth(req.headers.authorization);
    const job = await JobModel.findOne({ user: user.username });
    res.status(200).json(job);
    return;
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
