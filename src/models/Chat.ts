import mongoose, { Schema, Document } from 'mongoose';

interface Chat extends Document {
    firstName: string;
    lastName: string;
    messages: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
    lastMessage: string;
}

const ChatSchema = new Schema<Chat>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessage: { type: String },
}, { timestamps: true });

export default mongoose.model<Chat>('Chat', ChatSchema);
