import { Request, Response } from 'express';
import { Transaction } from '../entity/transaction';
import { User } from '../entity/user';
import { AppDataSource } from '../data-source';

export const withdrawal = async (req: Request, res: Response): Promise<void> => {
    const { userId, amount } = req.body;

    // validate the withdrawal amount
    if (amount <= 0) {
        res.status(400).json({ message: 'Withdrawal amount must be greater than 0' });
        return;
    }

    try {
        const userRepository = AppDataSource.getRepository(User);
        const transactionRepository = AppDataSource.getRepository(Transaction);

        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (user.balance < amount) {
            res.status(400).json({ message: 'Insufficient balance' });
            return;
        }

        // deduct the withdrawal amount from the user's balance
        user.balance -= amount;

        // save the updated user balance
        await userRepository.save(user);

        // create a new transaction record
        const transaction = transactionRepository.create({
            user,
            type: 'withdrawal',
            amount,
            balance: user.balance,
        });

        // save the transaction
        await transactionRepository.save(transaction);

        res.status(201).json({
            message: 'Withdrawal successful',
            transaction: {
                type: transaction.type,
                amount: transaction.amount,
                balance: transaction.balance,
                date: transaction.date,
            },
        });
    } catch (error: any) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
