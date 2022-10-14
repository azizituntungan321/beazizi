import { Document } from 'mongoose';
export class Product extends Document {
    readonly name: String;
    readonly description: String;
    readonly tag: String;
    readonly is_show: String;
}