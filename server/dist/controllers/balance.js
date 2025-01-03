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
exports.Balance = void 0;
const data_source_1 = require("../data-source");
const user_1 = require("../entity/user");
const Balance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log('Received ID:', id);
        const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        // check if ID is provided
        if (!id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const user = yield userRepository.findOneBy({ id });
        if (!user) {
            res.status(404).json({ message: 'user does not exist' });
            return;
        }
        res.status(200).json({
            message: 'Balance retrieved successfully',
            balance: user.balance,
        });
    }
    catch (error) {
        console.error('an error occured getting your balance', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.Balance = Balance;
