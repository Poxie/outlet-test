import client from "@/client";
import UserUtils from "./userUtils";

export default class UserQueries {
    static async getUserById(id: string) {
        const user = await client.user.findUnique({
            where: {
                id,
            }
        });
        if(!user) return null;

        return UserUtils.formatUser(user);
    }
}