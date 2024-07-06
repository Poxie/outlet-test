import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class AuthUtils {
    static async comparePasswords(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
    static async signToken(userId: string) {
        if(!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');

        const token = jwt.sign({ userId }, process.env.JWT_SECRET);
        
        return token;
    }
}