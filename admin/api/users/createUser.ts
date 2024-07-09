import { MutableUserProps, User } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function createUser(user: MutableUserProps & {
    password: string;
}) {
    return fetchFromAPI<User>(`/users`, {
        method: 'POST',
        body: JSON.stringify(user),
    })
}