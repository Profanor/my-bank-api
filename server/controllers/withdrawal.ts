import { Request, Response } from 'express';
import Transaction from '../models/transaction';
import User from '../models/user';

export const withdrawal = async(req: Request, res: Response): Promise<any> => {
    const { userId, amount } = req.body;
    if ( amount <= 0 ) {
        res.status(400).json({ message: 'withdrawal amount must be greater than 0'});
        return;
    }
    try {
        const user = await User.findById(userId);
        if(!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // check if user has sufficient balance
        if (user.balance < amount) {
            res.status(400).json({ message: 'Insufficient balance' });
            return;
        }

        user.balance -= amount;
        await user.save();

        const transaction = new Transaction({ 
            user: user._id,
            type: 'withdrawal', 
            amount, 
            balance: user.balance 
        });

        await transaction.save();

        res.status(201).json({ 
            message: 'Withdrawal successful',  
            transaction: {
                type: transaction.type,
                amount: transaction.amount,
                balance: transaction.balance,
                date: transaction.date,
    },
});
}   catch (error: any) {
    res.status(500).json({ message: 'server error', error: error.message });
    }
}