import { Document, Schema, Types, model } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    names: string;
    matricula: number;
    status: boolean;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    matricula: {
        type: Number,
        unique: true,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    names: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
 { versionKey: false }
);

export const User = model<IUser>('User', userSchema, 'user');
