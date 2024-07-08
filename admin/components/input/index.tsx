import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

export default function Input({ onChange, className, placeholder, value, label, type='text' }: {
    className?: string;
    placeholder?: string;
    onChange: (text: string) => void;
    type?: HTMLInputTypeAttribute;
    label?: string
    value?: string;
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    const inputId = label?.toLowerCase().replaceAll(' ', '-');
    return(
        <>
        {label && (
            <label 
                htmlFor={inputId}
                className="mb-1 block font-medium"
            >
                {label}
            </label>
        )}
        <input 
            id={inputId}
            type={type}
            value={value}
            onChange={handleChange}
            className={twMerge(
                "p-4 w-full border-[1px] border-tertiary rounded",
                className,
            )}
            placeholder={placeholder}
        />
        </>
    )
}