import * as mongoose from 'mongoose';
export const WarrantySchema = new mongoose.Schema({
    idroduct: { type: String, default: null, index: true },
    username: { type: String, default: null },
    status: { type: String, default: 'N' },
    note: { type: String, default: null },
    timestamp: { type: Number, default: Date.now },
});