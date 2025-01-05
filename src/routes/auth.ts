import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../services/authService';
import { IUser } from '../models/User';
import { Request, Response } from 'express';
import { verifyToken } from '../services/authService';

const router = Router();


router.get('/google', passport.authenticate('google', { scope: ['email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        if (req.isAuthenticated()) {

            const user = req.user as IUser;
            const token = generateToken(user?.googleId as string);
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            const redirectUrl = 'https://dapper-figolla-b5bd07.netlify.app/callback'
            res.redirect(`${redirectUrl}?token=${token}`);
        } else { res.status(401).json({ message: 'Authentication failed' }); }
    });




router.post('/verify', (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ valid: false, message: 'No token provided' });
        return
    }

    try {
        verifyToken(token)
        res.status(200).json({ valid: true });
    } catch (err) {
        res.status(401).json({ valid: false, message: 'Invalid token' });
        return;
    }
});


export default router;
