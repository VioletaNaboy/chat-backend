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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authService_1 = require("../services/authService");
const Chat_1 = __importDefault(require("../models/Chat"));
const defaultChat_1 = require("../services/defaultChat");
const router = (0, express_1.Router)();
router.get('/google', passport_1.default.authenticate('google', { scope: ['email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated()) {
        const user = req.user;
        const token = (0, authService_1.generateToken)(user === null || user === void 0 ? void 0 : user.googleId);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        const existingChats = yield Chat_1.default.find({ createdBy: user.googleId });
        if (existingChats.length === 0) {
            yield (0, defaultChat_1.createDefaultChats)(user.googleId);
        }
        res.status(200).json({ message: 'Logged in successfully', user: req.user });
    }
    else {
        res.status(401).json({ message: 'Authentication failed' });
    }
}));
exports.default = router;
