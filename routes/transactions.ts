import express from 'express';
import { deposit } from '../controllers/deposit';

const router = express.Router();

router.post('/deposit', deposit);

export default router;