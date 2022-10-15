import { Document } from 'mongoose';
export class Users extends Document {
    readonly username: String;
    password: String;
    role: String;
    active: String;
}