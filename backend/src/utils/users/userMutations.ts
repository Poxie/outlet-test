import bcrypt from 'bcrypt';
import client from "@/client";
import { User } from "@prisma/client";
import UserUtils from "./userUtils";
import { EmailTakenError } from '../errors/userError';
import { PrismaCodes } from '../errors/prismaCodes';

export default class UserMutations {
    static async createUser({ email, name, password }: Pick<User, 'name' | 'email' | 'password'>) {
        if(!process.env.BCRYPT_SALT_ROUNDS) throw new Error('BCRYPT_SALT_ROUNDS not set');

        const id = await UserUtils.generateUserId();

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        try {
            const user = await client.user.create({
                data: {
                    id,
                    email,
                    name,
                    password: hashedPassword,
                }
            })
            return user;
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_EXISTS) {
                throw new EmailTakenError();
            }
        }
    }
}