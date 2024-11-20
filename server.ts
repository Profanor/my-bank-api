import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import indexRoute from './routes/index';
import transactionRoute from './routes/transactions';

const app = express();
const port = process.env.PORT || '5000';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', indexRoute);
app.use('/api/transactions', transactionRoute);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});