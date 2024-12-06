import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ['savings', 'current'],
        default: 'savings',
    },
    balance: {
        type: Number,
        default: 0,
    },
    isActive: {
    type: Boolean,
    default: true, 
    },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export default User;