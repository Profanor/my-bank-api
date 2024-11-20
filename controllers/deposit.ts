import { Request, Response } from 'express'
import Transaction from '../models/transaction';
import User from '../models/user';


export const deposit = async(req: Request, res: Response) => {
    const { userId, amount } = req.body;
    if ( amount <= 0) {
        return res.status(400).json({ message: 'Deposit amount must be greater than 0'});
    }
    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.balance += amount;
        await user.save();

        const transaction = new Transaction({ 
            type: 'deposit', 
            amount, 
            balance: user.balance 
        });

        await transaction.save();

        res.status(201).json({ message: 'Deposit successful', balance: user.balance });
    }   catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}