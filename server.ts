import express from 'express';
import { Request, Response, NextFunction } from 'express';
import db from './db/database';
import dotenv from 'dotenv';
dotenv.config();
/*------------------------------------------- */
import indexRoute from './routes/index';
import transactionRoute from './routes/transactions';

db(); // call db connect
const app = express();
const port = process.env.PORT || '5000';

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', indexRoute);
app.use('/api/transactions', transactionRoute);

app.use(( err: any, req: Request, res: Response, next: NextFunction ) => {
    console.error(err.message);
    res.status(500).json({ error: 'something happened'})
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});