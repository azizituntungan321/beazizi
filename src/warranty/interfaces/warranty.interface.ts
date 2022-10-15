import { Document } from 'mongoose';
export class Warranty extends Document {
    readonly idProduct: String;
    readonly username: String;
    status: String;
    note: String;
}