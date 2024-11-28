import express from 'express'
import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async(req: Request, res: Response): Promise<any> => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: 'Users fetched successfully',
            users,
        });
    }   catch (error: any) {
        console.error('an error occured fetching users:', error.message);
        res.status(500).json({ message: 'internal server error', error: error.message });        
    }
}