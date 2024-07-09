import Input from "@/components/input"
import { User } from "@/utils/types";

export default function UserInformation({ user, self, updateProps }: {
    user: User;
    self: User;
    updateProps: (changes: Partial<User>) => void;
}) {
    const canEdit = self.id === user.id || self.role === 'ADMINISTRATOR';
    return(
        <div className="flex gap-4">
            <Input 
                label="Full name"
                value={user.name}
                placeholder="Full name"
                onChange={name => updateProps({ name })}
                containerClassName="flex-1"
                disabled={!canEdit}
            />
            <Input 
                label="Email"
                value={user.email}
                placeholder="Email adress"
                onChange={email => updateProps({ email })}
                containerClassName="flex-1"
                disabled={!canEdit}
            />
        </div>
    )
}