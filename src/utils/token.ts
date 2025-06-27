import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ACCESS_SECRET = "secret1234utd";

const timeToLive = 60 * 15; 

export const generateAccessToken = (matriculaId: string) => {
    return jwt.sign(
        { matriculaId },
        ACCESS_SECRET,
        { expiresIn: timeToLive }
    )
};