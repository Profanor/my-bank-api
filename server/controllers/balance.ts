import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';

export const Balance = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log('Received ID:', id);

        const userRepository = AppDataSource.getRepository(User);

        // check if ID is provided
        if (!id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        
        const user = await userRepository.findOneBy({ id })

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