import { User } from "@/utils/types"
import Button from "../button";

export default function UsersTableRow({ user, self }: {
    user: User;
    self: User;
}) {
    const userInitials = user.name.split(' ').map(name => name[0]).join('');
    const userRole = user.role.slice(0,1) + user.role.slice(1).toLowerCase();
    const canEdit = self.role === 'ADMINISTRATOR' || self.id === user.id;

    const tdClassName = 'px-4 py-2.5';
    return (
        <tr className="divide-y-[1px] divide-secondary">
            <td className={tdClassName}>
                <div className="flex items-center gap-3">
                    <div className="w-8 aspect-square flex items-center justify-center bg-tertiary border-[1px] border-quaternary rounded-full uppercase text-xs font-bold">
                        {userInitials}
                    </div>
                    <div>
                        {user.name}
                        {self.id === user.id && (
                            <span className="text-sm text-muted ml-1">(You)</span>
                        )}
                    </div>
                </div>
            </td>
            <td className={tdClassName}>{user.email}</td>
            <td className={tdClassName}>{userRole}</td>
            <td className={tdClassName}>
                {canEdit && (
                    <div className="flex justify-end">
                        <Button 
                            type="transparent"
                            className="py-2.5 px-3"
                            href={`/people/${user.id}`}
                        >
                            Edit user
                        </Button>
                    </div>
                )}
            </td>
        </tr>
    )
}