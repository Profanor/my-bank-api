import { Request, Response } from 'express'
import Transaction from '../models/transaction';

let balance = 0;

export const deposit = async(req: Request, res: Response) => {
    const { amount } = req.body;
    if ( amount <= 0) {
        return res.status(400).json({ message: 'Deposit amount must be greater than 0'});
    }

    balance += amount;
    
    const transaction = new Transaction({ type: 'deposit', amount, balance });
    await transaction.save();

    res.status(201).json({ message: 'Deposit successful', balance });
}