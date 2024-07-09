import Input from "@/components/input"
import { useUser } from "."

export default function UserInformation() {
    const { user, self } = useUser();

    const canEdit = self.id === user.id || self.role === 'ADMINISTRATOR';
    return(
        <div className="flex gap-4">
            <Input 
                label="Full name"
                value={user.name}
                onChange={() => {}}
                containerClassName="flex-1"
                disabled={!canEdit}
            />
            <Input 
                label="Email"
                value={user.email}
                onChange={() => {}}
                containerClassName="flex-1"
                disabled={!canEdit}
            />
        </div>
    )
}