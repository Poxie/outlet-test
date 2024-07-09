import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

export default function Input({ onChange, containerClassName, className, placeholder, value, label, textArea, type='text' }: {
    containerClassName?: string;
    className?: string;
    placeholder?: string;
    onChange: (text: string) => void;
    type?: HTMLInputTypeAttribute;
    label?: string
    value?: string;
    textArea?: boolean;
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
    }

    const inputId = label?.toLowerCase().replaceAll(' ', '-');

    const props = {
        id: inputId,
        onChange: handleChange,
        className: twMerge(
            "p-4 w-full block border-[1px] border-tertiary rounded",
            className,
        ),
        placeholder,
        value,
    }

    return(
        <div className={containerClassName}>
            {label && (
                <label 
                    htmlFor={inputId}
                    className="mb-1 block font-medium"
                >
                    {label}
                </label>
            )}
            {!textArea && (
                <input 
                    {...props}
                />
            )}
            {textArea && (
                <textarea
                    style={{ minHeight: 120 }} 
                    {...props}
                />
            )}
        </div>
    )
}