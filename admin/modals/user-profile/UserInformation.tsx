import Input from "@/components/input";
import { User } from "@/utils/types"

export default function UserInformation({ user, updateProps, canEdit }: {
    user: User;
    updateProps: (changes: Partial<User>) => void;
    canEdit?: boolean;
}) {
    return(
        <div className="p-4 grid gap-3">
            <Input 
                label="Name"
                value={user.name}
                onChange={name => updateProps({ name })}
                disabled={!canEdit}
            />
            <Input 
                label="Email"
                value={user.email}
                onChange={email => updateProps({ email })}
                disabled={!canEdit}
            />
        </div>
    )
}