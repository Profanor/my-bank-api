import { Request, Response } from 'express';
import { comparePassword } from '../utils/password';
import User from '../models/user';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Missing required fields: email and password are mandatory' });
            return;
        }

        const user = await User.findOne({email})
        if (!user) {
            res.status(404).json({ message: 'User not found. Please register first.' });
            return;
        }

        // verify the password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials. Please try again.' });
            return;
        }

        // jwt implementation

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
            // token,
        });

    }
    catch (error: any) {
        console.error('somehing happened', error);
        res.status(500).json({ message: 'internal server error', error: error.message})
    }
}
