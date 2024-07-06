import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request } from 'express';

export default class AuthUtils {
    static async comparePasswords(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
    static signToken(userId: string) {
        if(!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');

        const token = jwt.sign({ userId }, process.env.JWT_SECRET);
        
        return token;
    }
    static verifyToken(accessToken: string) {
        if(!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');

        try {
            const data = jwt.verify(accessToken, process.env.JWT_SECRET) as { userId: string };
            return data.userId;
        } catch(error: any) {
            return null;
        }
    }
}