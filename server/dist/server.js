"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/*------------------------------------------- */
const index_1 = __importDefault(require("./routes/index"));
const auth_1 = __importDefault(require("./routes/auth"));
const transactions_1 = __importDefault(require("./routes/transactions"));
/*------------------------------------------- */
const app = (0, express_1.default)();
const port = process.env.PORT || '5000';
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api', index_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/transactions', transactions_1.default);
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'something happened' });
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
