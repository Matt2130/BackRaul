import { Date, Document, Schema, Types, model } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    emisor: string;
    receptor: number;
    mensaje: string;
    fecha: Date;
};

const userSchema = new Schema<IUser>({
    emisor: {
        type: String,
        required: true
    },
    receptor: {
        type: Number,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
},
 { versionKey: false }
);

export const Message  = model<IUser>('Message', userSchema, 'mensajes');
