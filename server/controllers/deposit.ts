import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Transaction } from '../entity/transaction';
import { User } from '../entity/user';


export const deposit = async(req: Request, res: Response): Promise<void> => {
    const { userId, amount } = req.body;

    if (!amount || amount <= 0 ) {
        res.status(400).json({ message: 'Deposit amount must be greater than 0'});
        return;
    }
    try {
        const userRepository = AppDataSource.getRepository(User);
        const transactionRepository = AppDataSource.getRepository(Transaction);

        const user = await userRepository.findOneBy({ id: userId });
            if(!user) {
                res.status(404).json({ message: 'User does not exist' });
                return;
        }

        user.balance = Number(user.balance) + Number(amount);
        await userRepository.save(user);

        const transaction = transactionRepository.create({ 
            user,
            type: 'deposit', 
            amount: Number(amount), 
            balance: user.balance 
        });
        await transactionRepository.save(transaction);

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
        console.error('an error occured:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}