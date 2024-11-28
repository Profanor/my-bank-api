"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposit = void 0;
const transaction_1 = __importDefault(require("../models/transaction"));
const user_1 = __importDefault(require("../models/user"));
const deposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, amount } = req.body;
    if (!amount || amount <= 0) {
        res.status(400).json({ message: 'Deposit amount must be greater than 0' });
        return;
    }
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User does not exist' });
            return;
        }
        user.balance = Number(user.balance) + Number(amount);
        yield user.save();
        const transaction = new transaction_1.default({
            user: user._id,
            type: 'deposit',
            amount: Number(amount),
            balance: user.balance
        });
        yield transaction.save();
        res.status(201).json({
            message: 'Deposit successful',
            transaction: {
                type: transaction.type,
                amount: transaction.amount,
                balance: transaction.balance,
                date: transaction.date,
            },
        });
    }
    catch (error) {
        console.error('an error occured:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.deposit = deposit;
