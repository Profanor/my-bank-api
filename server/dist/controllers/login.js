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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const password_1 = require("../utils/password");
const data_source_1 = require("../data-source");
const user_1 = require("../entity/user");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        if (!email || !password) {
            res.status(400).json({ message: 'Missing required fields: email and password are mandatory' });
            return;
        }
        const user = yield userRepository.findOneBy({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found. Please register first.' });
            return;
        }
        // verify the password
        const isPasswordValid = yield (0, password_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials. Please try again.' });
            return;
        }
        // jwt implementation
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
            // token,
        });
    }
    catch (error) {
        console.error('somehing happened', error);
        res.status(500).json({ message: 'internal server error', error: error.message });
    }
});
exports.login = login;
