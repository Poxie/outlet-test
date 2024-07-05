import client from "@/client";

export default class UserQueries {
    static async getUserById(id: string) {
        const user = await client.user.findUnique({
            where: {
                id,
            }
        });
        return user;
    }
}