import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://https://chat-backend-ofrx.onrender.com/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User({
                googleId: profile.id,
                displayName: profile.displayName,
                emails: profile.emails,
                image: profile.photos ? profile.photos[0].value : ''
            });
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));
