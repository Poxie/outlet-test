import UsersTableRow from "./UsersTableRow";
import UsersTableHead from "./UsersTableHead";
import { User } from "@/utils/types";

export default function UsersTable({ users, self }: {
    users: User[];
    self: User;
}) {
    return(
        <div className="grid">
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <UsersTableHead />
                    <tbody className="divide-y-[1px] divide-secondary">
                        {users.map(user => (
                            <UsersTableRow 
                                user={user}
                                self={self}
                                key={user.id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}