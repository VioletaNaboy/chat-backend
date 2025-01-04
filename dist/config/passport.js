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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = require("../models/User");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://chat-backend-ofrx.onrender.com/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Google Profile:', profile);
    try {
        let user = yield User_1.User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User_1.User({
                googleId: profile.id,
                displayName: profile.displayName,
                emails: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a.map(email => ({
                    value: email.value,
                    verified: email.verified
                })),
                image: profile.photos ? profile.photos[0].value : ''
            });
            yield user.save();
        }
        done(user);
    }
    catch (err) {
        done(err);
    }
})));
