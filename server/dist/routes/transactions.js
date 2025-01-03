"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deposit_1 = require("../controllers/deposit");
const withdrawal_1 = require("../controllers/withdrawal");
const balance_1 = require("../controllers/balance");
const router = express_1.default.Router();
router.post('/deposit', deposit_1.deposit);
router.post('/withdrawal', withdrawal_1.withdrawal);
router.get('/balance/:id', balance_1.Balance);
exports.default = router;
