import express from 'express';
import { register } from '../controllers/register';
import { getUser, getUsers } from '../controllers/users';

const router = express.Router();

router.post('/register', register);
router.get('/users', getUsers);
router.get('/user', getUser)

export default router;