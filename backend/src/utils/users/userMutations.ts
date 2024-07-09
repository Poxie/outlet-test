import bcrypt from 'bcrypt';
import client from "@/client";
import { User } from "@prisma/client";
import UserUtils from "./userUtils";
import { PrismaCodes } from '../errors/prismaCodes';
import { EmailTakenError } from '../errors/userErrors';

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
                    createdAt: new Date().getTime().toString(),
                }
            })
            return UserUtils.formatUser(user);
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_EXISTS) {
                throw new EmailTakenError();
            }
        }
    }

    static async updateUser(id: string, data: Partial<Exclude<User, 'id'>>) {
        if(!process.env.BCRYPT_SALT_ROUNDS) throw new Error('BCRYPT_SALT_ROUNDS not set');

        if(data.password) {
            data.password = await bcrypt.hash(data.password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
        }

        const user = await client.user.update({
            where: {
                id,
            },
            data,
        });

        return UserUtils.formatUser(user);
    }
}