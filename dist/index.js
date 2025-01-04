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
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const app_1 = __importDefault(require("./app"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require("./config/passport");
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const secret = process.env.JWT_SECRET || 'default-secret';
app_1.default.use((0, express_session_1.default)({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGODB_URL }),
}));
app_1.default.use(passport_1.default.initialize());
app_1.default.use(passport_1.default.session());
app_1.default.use('/auth', auth_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
startServer();
