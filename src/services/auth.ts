import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { ObjectId } from "mongoose";
import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()

interface CustomJwtPayload extends JwtPayload {
    clientId?: string;
}

export class AuthService {
    private readonly jwtSecretKey: string;

    constructor() {
        this.jwtSecretKey = process.env.USER_SECRET_KEY || 'Amal';
        if (!process.env.USER_SECRET_KEY) {
            throw new Error('USER_SECRET_KEY is not defined in the ENV file');
        }
    }

    createToken = async (clientId: ObjectId | string, expire: string): Promise<string> => {
        return jwt.sign({ clientId }, this.jwtSecretKey, { expiresIn: expire as SignOptions['expiresIn'] });
    };

    verifyOption = (token: string): CustomJwtPayload | { message: string } => {
        try {
            return jwt.verify(token, this.jwtSecretKey) as CustomJwtPayload;
        } catch (error: any) {
            console.error("Token verification failed:", error.message);
            return { message: "Invalid OTP" };
        }
    };
}
