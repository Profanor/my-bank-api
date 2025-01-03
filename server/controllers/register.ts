import { Request, Response } from 'express';
import { hashPassword } from '../utils/password'
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, password, accountType, balance, isActive } = req.body;

        // validate required fields
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ message: 'Missing required fields: firstName, lastName, email, and password are mandatory' });
            return;
        }

        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOneBy({ email })
        if (existingUser) {
            res.status(400).json({ message: 'user already exists'});
            return;
        }

        // hash the password
        const hashedPassword = await hashPassword(password);

        const newUser = await userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            balance,
            isActive
        });

        // save the user to the database
        await userRepository.save(newUser);
        console.log('NewUser:', newUser);
        

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
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