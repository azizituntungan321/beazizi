import * as mongoose from 'mongoose';
export const ProductSchema = new mongoose.Schema({
    name: { type: String, index: true },
    description: { type: String, default: null },
    tag: { type: String, default: null },
    is_show: { type: String, default: "Y", index: true },
    timestamp: { type: Number, default: Date.now },
});