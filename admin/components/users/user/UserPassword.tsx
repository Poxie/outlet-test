import Input from "@/components/input";
import { twMerge } from "tailwind-merge";
import { useUser } from ".";

export default function UserPassword({ className }: {
    className?: string;
}) {
    const { user, updateUserProps } = useUser();
    
    return(
        <div className={twMerge(
            "flex gap-4",
            className,
        )}>
            <Input 
                label="Password"
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={password => updateUserProps({ password })}
                containerClassName="flex-1"
            />
            <Input 
                label="Repeat password"
                type="password"
                placeholder="Repeat password"
                value={user.repeatPassword}
                onChange={repeatPassword => updateUserProps({ repeatPassword })}
                containerClassName="flex-1"
            />
        </div>
    )
}