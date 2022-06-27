import express from 'express';
import { Create } from '../../controllers/user/Create.js';
import { Delete } from '../../controllers/user/Delete.js';
import { Login } from '../../controllers/user/Login.js';
import { User } from '../../controllers/user/User.js';

const router = express.Router();

router.get('/', User);
router.post('/login', Login);
router.post('/create', Create);
router.post('/delete', Delete);

export default router;
