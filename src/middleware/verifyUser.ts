import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../services/authService';

export const verifyUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }

    try {
        const decoded = verifyToken(token);
        if (typeof decoded !== 'string' && 'id' in decoded) {
            req.user = decoded.id;
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
    }
};
