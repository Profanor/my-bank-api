"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = require("../controllers/register");
const users_1 = require("../controllers/users");
const login_1 = require("../controllers/login");
const router = express_1.default.Router();
router.post('/signup', register_1.register);
router.post('/login', login_1.login);
router.get('/users', users_1.getUsers);
router.get('/user', users_1.getUser);
exports.default = router;
