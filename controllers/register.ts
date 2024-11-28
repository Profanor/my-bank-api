import { Request, Response } from 'express';
import { hashPassword } from '../utils/password'
import User from '../models/user';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, password, accountType, balance, isActive } = req.body;

        // validate required fields
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ message: 'Missing required fields: firstName, lastName, email, and password are mandatory' });
            return;
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: 'user already exists'});
            return;
        }

        // hash the password
        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            balance,
            isActive
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                accountType: newUser.accountType,
                balance: newUser.balance,
            },
        });

    }   catch (error: any) {
        console.error('internal server error:', error.message);
        res.status(500).json({ message: 'an error occured', error: error.message })
    }
}