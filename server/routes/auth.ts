import express from 'express';
import { register } from '../controllers/register';
import { getUser, getUsers } from '../controllers/users';
import { login } from '../controllers/login';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/user', getUser)

export default router;