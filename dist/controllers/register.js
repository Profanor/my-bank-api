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
exports.register = void 0;
const password_1 = require("../utils/password");
const user_1 = __importDefault(require("../models/user"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, accountType, balance, isActive } = req.body;
        // validate required fields
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ message: 'Missing required fields: firstName, lastName, email, and password are mandatory' });
            return;
        }
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'user already exists' });
            return;
        }
        // hash the password
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        const newUser = yield user_1.default.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            balance,
            isActive
        });
        console.log('NewUser:', newUser);
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
    }
    catch (error) {
        console.error('internal server error:', error.message);
        res.status(500).json({ message: 'an error occured', error: error.message });
    }
});
exports.register = register;
