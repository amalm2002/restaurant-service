
import { ObjectId } from 'mongoose';

interface CustomJwtPayload {
    clientId?: string;
    role?: string;
}

export interface IAuthService {
    createToken(clientId: ObjectId | string, expire: string, role: string): Promise<string>;
    verifyOption(token: string): CustomJwtPayload | { message: string };
}