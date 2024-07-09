import client from "@/client";
import UserUtils from "./userUtils";

export default class UserQueries {
    static async getUsers() {
        const users = await client.user.findMany();
        return users.map(user => UserUtils.formatUser(user));
    }
    static async getUserById(id: string) {
        const user = await client.user.findUnique({
            where: {
                id,
            }
        });
        if(!user) return null;

        return UserUtils.formatUser(user);
    }
    static async getUserByEmail(email: string) {
        const user = await client.user.findUnique({
            where: {
                email,
            }
        });

        return user;
    }
}