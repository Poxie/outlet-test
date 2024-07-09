import { User } from "@prisma/client";
import { USER_ID_LENGTH } from "./userConstants";
import UserQueries from "./userQueries";

export default class UserUtils {
    static async generateUserId(): Promise<string> {
        const mathOffset = 2;
        const id = Math.random().toString().slice(mathOffset, USER_ID_LENGTH + mathOffset);

        if(await UserQueries.getUserById(id)) return this.generateUserId();

        return id;
    }

    static formatUser(user: User) {
        const { password, ...rest } = user;
        return rest;
    }
}