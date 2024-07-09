import Input from "@/components/input";
import { twMerge } from "tailwind-merge";

export default function UserPassword({ className, password, repeatPassword, updatePasswords }: {
    className?: string;
    password: string;
    repeatPassword: string;
    updatePasswords: (args: Partial<{
        password: string;
        repeatPassword: string;
    }>) => void;
}) {
    return(
        <div className={twMerge(
            "flex gap-4",
            className,
        )}>
            <Input 
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={password => updatePasswords({ password })}
                containerClassName="flex-1"
            />
            <Input 
                label="Repeat password"
                type="password"
                placeholder="Repeat password"
                value={repeatPassword}
                onChange={repeatPassword => updatePasswords({ repeatPassword })}
                containerClassName="flex-1"
            />
        </div>
    )
}