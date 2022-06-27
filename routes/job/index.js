import express from 'express';
import { CreateShift } from '../../controllers/job/CreateShift.js';
import { DeleteShift } from '../../controllers/job/DeleteShift.js';
import { Job } from '../../controllers/job/Job.js';
import { UpdateShift } from '../../controllers/job/UpdateShift.js';

const router = express.Router();

router.get('/', Job);
router.post('/create-shift', CreateShift);
router.post('/delete-shift', DeleteShift);
router.post('/update-shift', UpdateShift);

export default router;
