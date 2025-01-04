import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    googleId: string;
    displayName: string;
    email: string;
    image: string;
}

const UserSchema: Schema = new Schema({
    googleId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    emails: { type: String, required: true },
    image: { type: String }
});

export const User = mongoose.model<IUser>('User', UserSchema);
