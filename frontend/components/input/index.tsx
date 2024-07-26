import { twMerge } from "tailwind-merge";

export default function Input({ onChange, containerClassName, className, placeholder, value, icon }: {
    containerClassName?: string;
    className?: string;
    placeholder?: string;
    onChange: (text: string) => void;
    value?: string;
    icon?: React.ReactNode;
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
    }

    return(
        <div className={twMerge(
            "w-full relative flex items-center gap-3",
            containerClassName,
        )}>
            {icon && (
                <div className="absolute left-4 pointer-events-none text-muted">
                    {icon}
                </div>
            )}
            <input 
                className={twMerge(
                    "p-4 pl-12 w-full",
                    className,
                )}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}