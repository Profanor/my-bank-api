import { Request, Response } from 'express';
import Transaction from '../models/transaction';
import User from '../models/user';


export const deposit = async(req: Request, res: Response): Promise<void> => {
    const { userId, amount } = req.body;
    if ( amount <= 0 ) {
        res.status(400).json({ message: 'Deposit amount must be greater than 0'});
        return;
    }
    try {
        const user = await User.findById(userId);
            if(!user || !amount) {
                res.status(404).json({ message: 'User ID and amount are required' });
                return;
        }

        user.balance += amount;
        await user.save();

        const transaction = new Transaction({ 
            user: user._id,
            type: 'deposit', 
            amount, 
            balance: user.balance 
        });

        await transaction.save();

        res.status(201).json({ 
            message: 'Deposit successful',  
            transaction: {
                type: transaction.type,
                amount: transaction.amount,
                balance: transaction.balance,
                date: transaction.date,
            }, 
        });
    }   catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}