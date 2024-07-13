import Input from "@/components/input";

export default function UserPassword({ passwords, updatePasswords }: {
    passwords: {
        password: string;
        repeatPassword: string;
    };
    updatePasswords: (props: { 
        password?: string; 
        repeatPassword?: string 
    }) => void;
}) {
    return(
        <div className="p-4 grid gap-3">
            <Input 
                label="New password"
                placeholder="New password"
                type="password"
                onChange={password => updatePasswords({ password })}
                value={passwords.password}
            />
            <Input 
                label="Repeat password"
                placeholder="Repeat password"
                type="password"
                onChange={repeatPassword => updatePasswords({ repeatPassword })}
                value={passwords.repeatPassword}
            />
        </div>
    )
}