import { Request, Response } from 'express';
import User from '../models/user';

export const Balance = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)

        if (!user) {
            res.status(404).json({ message: 'user does not exist'});
            return;
        }

        res.status(200).json({
            message: 'Balance retrieved successfully',
            balance: user.balance,
        });
    }   catch (error: any) {
        console.error('an error occured getting your balance', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}