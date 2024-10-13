import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@/utils/types";

export default function UserInfo({ user }: {
    user: User;
}) {
    const { data: self } = useCurrentUser();

    const userInitials = user.name.split(' ').map(name => name[0]).join('');
    return(
        <div className="flex items-start gap-3">
            <div className="w-8 min-w-8 aspect-square flex items-center justify-center bg-tertiary border-[1px] border-quaternary rounded-full uppercase text-xs font-bold">
                {userInitials}
            </div>
            <div>
                <div>
                    <span className="font-medium">
                        {user.name}
                    </span>
                    {self?.id === user.id && (
                        <span className="text-sm text-muted ml-1">(You)</span>
                    )}
                </div>
                <span className="-mt-0.5 block text-sm text-muted">
                    {user.email}
                </span>
            </div>
        </div>
    )
}