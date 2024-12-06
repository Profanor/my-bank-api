import express from 'express';
import { deposit } from '../controllers/deposit';
import { withdrawal } from '../controllers/withdrawal';
import { Balance } from '../controllers/balance';

const router = express.Router();

router.post('/deposit', deposit);
router.post('/withdrawal', withdrawal);
router.get('/balance/:id', Balance);

export default router;