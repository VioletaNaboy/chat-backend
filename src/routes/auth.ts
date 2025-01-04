import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../services/authService';

const router = Router();
interface User {
    id: string;
    email: string;
}

router.get('/google', passport.authenticate('google', { scope: ['email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        const user = req.user as User;
        const token = generateToken(user?.id as string);
        res.json({ token });
    });

export default router;
