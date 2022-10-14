import * as mongoose from 'mongoose';
export const UsersSchema = new mongoose.Schema({
    username: { type: String, default: null },
    password: { type: String, default: null },
    role: { type: String, default: "USER", index: true },
    timestamp: { type: Number, default: Date.now },
});