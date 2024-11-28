import express from 'express';
import { register } from '../controllers/register';
import { getUsers } from '../controllers/users';

const router = express.Router();

router.post('/register', register);
router.get('/users', getUsers);

export default router;