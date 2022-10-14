import { Document } from 'mongoose';
export class Users extends Document {
    readonly username: String;
    readonly role: String;
}