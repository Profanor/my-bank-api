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
exports.getUser = exports.getUsers = void 0;
const data_source_1 = require("../data-source");
const user_1 = require("../entity/user");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        const users = yield userRepository.find();
        res.status(200).json({
            message: 'Users fetched successfully',
            users,
        });
    }
    catch (error) {
        console.error('an error occured fetching users:', error.message);
        res.status(500).json({ message: 'internal server error', error: error.message });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        const user = yield userRepository.findOneBy({ id });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            message: 'User retrieved successfully',
            user
        });
    }
    catch (error) {
        console.error('an error occured fetching that user:', error.message);
        res.status(500).json({ message: 'internal server error', error: error.message });
    }
});
exports.getUser = getUser;
