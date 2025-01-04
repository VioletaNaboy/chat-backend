import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    googleId: string;
    displayName: string;
    emails: { value: string, verified: boolean }[];
    image: string;
}

const UserSchema: Schema = new Schema({
    googleId: { type: String, required: true, unique: true },
    displayName: { type: String },
    emails: [{
        value: { type: String, required: true },
        verified: { type: Boolean, required: true }
    }],
    image: { type: String }
});

export const User = mongoose.model<IUser>('User', UserSchema);
