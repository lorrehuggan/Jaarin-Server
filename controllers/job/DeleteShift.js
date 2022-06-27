import { JobModel } from '../../model/job.js';
import { checkAuth } from '../../utils/check_auth.js';

export const DeleteShift = async (req, res) => {
  const user = checkAuth(req.headers.authorization, res);
  const { jobID, wageID } = req.body;
  const job = await JobModel.findOne({ _id: jobID });

  if (user.username !== job.user) {
    res.json({ message: 'User not authorized' });
    return;
  }
  if (!job.wages) {
    res.json({ message: 'Item is not found' });
    return;
  }

  const shifts = job.wages;

  const updatedJob = shifts.filter((shift) => {
    return shift._id.toString() !== wageID;
  });

  job.wages = updatedJob;
  job.updatedAt = Date.now();

  try {
    const data = await job.save();
    res.status(200).json(data);
    return;
  } catch (error) {
    res.json({ error: error.message });
  }
};
