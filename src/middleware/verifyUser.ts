
import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../services/authService';

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
