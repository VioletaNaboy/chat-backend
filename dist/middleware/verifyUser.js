"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const authService_1 = require("../services/authService");
const verifyUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }
    try {
        const decoded = (0, authService_1.verifyToken)(token);
        if (typeof decoded !== 'string' && 'id' in decoded) {
            req.user = decoded.id;
        }
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
    }
};
exports.verifyUser = verifyUser;
