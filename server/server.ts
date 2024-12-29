import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import db from './db/database';
import dotenv from 'dotenv';
dotenv.config();
/*------------------------------------------- */
import indexRoute from './routes/index';
import authRoute from './routes/auth';
import transactionRoute from './routes/transactions';

db(); // call db connect

const app = express();
const port = process.env.PORT || '5000';

app.use(cors({
  origin: "http://localhost:3000", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', indexRoute);
app.use('/api/auth', authRoute);
app.use('/api/transactions', transactionRoute);

app.use(( err: any, req: Request, res: Response, next: NextFunction ) => {
    console.error(err.message);
    res.status(500).json({ error: 'something happened'})
});


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});