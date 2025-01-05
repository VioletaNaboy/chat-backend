"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const authService_1 = require("../services/authService");
const verifyUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = (0, authService_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
exports.verifyUser = verifyUser;
