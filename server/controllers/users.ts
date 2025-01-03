import express from 'express'
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';

export const getUsers = async(req: Request, res: Response): Promise<any> => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find();

        res.status(200).json({
            message: 'Users fetched successfully',
            users,
        });
    }   catch (error: any) {
        console.error('an error occured fetching users:', error.message);
        res.status(500).json({ message: 'internal server error', error: error.message });        
    }
}

export const getUser = async(req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({ id });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            user
        });
    } catch (error: any) {
        console.error('an error occured fetching that user:', error.message);
        res.status(500).json({ message: 'internal server error', error: error.message }); 
    }
}