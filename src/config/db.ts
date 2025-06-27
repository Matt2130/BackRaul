import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = "mongodb://localhost:27017/proyectoRaul"

const connectDB = async():Promise<void> => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Conexión a mongo")
    }
    catch (error) {
        console.log("Error de conexión : ", error)
    }
};

export default connectDB;