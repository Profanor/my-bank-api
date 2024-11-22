import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '')
        console.log('connected to the db');
    }   catch (err) {
        console.error('error connecting to db:', err);
        return;
    }
} 
export default db;