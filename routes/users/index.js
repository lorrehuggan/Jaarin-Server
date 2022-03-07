import express from 'express';
import { Create } from './Create.js';
import { User } from './User.js';

const router = express.Router();

router.get('/', User);
router.post('/', Create);

export default router;
