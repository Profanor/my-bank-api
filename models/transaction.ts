import mongoose, { Schema } from 'mongoose';

const transactionSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;