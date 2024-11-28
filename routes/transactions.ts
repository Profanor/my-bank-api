import express from 'express';
import { deposit } from '../controllers/deposit';
import { withdrawal } from '../controllers/withdrawal';

const router = express.Router();

router.post('/deposit', deposit);
router.post('/withdrawal', withdrawal);

export default router;