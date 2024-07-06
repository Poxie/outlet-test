import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

export default function Input({ onChange, className, placeholder, value, type='text' }: {
    className?: string;
    placeholder?: string;
    onChange: (text: string) => void;
    type?: HTMLInputTypeAttribute;
    value?: string;
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    return(
        <input 
            type={type}
            value={value}
            onChange={handleChange}
            className={twMerge(
                "p-4 w-full border-[1px] border-tertiary rounded",
                className,
            )}
            placeholder={placeholder}
        />
    )
}