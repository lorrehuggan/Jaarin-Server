import { JobModel } from '../../model/job.js';
import { checkAuth } from '../../utils/check_auth.js';

export const UpdateShift = async (req, res) => {
  const user = checkAuth(req.headers.authorization, res);
  const { wageID, tips, hours_worked, date } = req.body;
  const job = await JobModel.findOne({ user: user.username });
  if (user.username !== job.user) {
    res.json({ message: 'User not authorized' });
    return;
  }
  if (!job.wages) {
    res.json({ message: 'Item is not found' });
    return;
  }

  let wageToEdit = job.wages.filter((shift) => {
    return shift._id.toString() === wageID;
  });

  let filteredShifts = job.wages.filter((shift) => {
    return shift._id.toString() !== wageID;
  });

  filteredShifts.push({
    tips: tips ? tips : wageToEdit[0].tips,
    hours_worked: hours_worked ? hours_worked : wageToEdit[0].hours_worked,
    date: date ? date : wageToEdit[0].date,
    _id: wageID,
  });

  job.wages = filteredShifts;
  job.updatedAt = Date.now();

  try {
    const data = await job.save();
    res.status(200).json(data);
  } catch (error) {
    console.log({ error: error.message });
  }
};
