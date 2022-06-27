import { JobModel } from '../../model/job.js';
import { checkAuth } from '../../utils/check_auth.js';

export const CreateShift = async (req, res) => {
  const authUser = checkAuth(req.headers.authorization, res);

  const { tips, hours_worked, date } = req.body;

  try {
    const job = await JobModel.findOne({ user: authUser.username });

    job.wages.push({ tips, hours_worked, date });

    const newWage = await job.save();
    res.status(200).json(newWage);
    return;
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
