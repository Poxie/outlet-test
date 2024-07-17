import LockIcon from "@/assets/icons/LockIcon";
import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

export default function Input({ onChange, containerClassName, className, placeholder, value, label, textArea, disabled, autoFocus, type='text' }: {
    containerClassName?: string;
    className?: string;
    placeholder?: string;
    onChange: (text: string) => void;
    type?: HTMLInputTypeAttribute;
    label?: string
    value?: string;
    textArea?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
    }

    const inputId = label?.toLowerCase().replaceAll(' ', '-');

    const props = {
        id: inputId,
        onChange: handleChange,
        className: twMerge(
            "p-3 w-full block border-[1px] border-tertiary rounded",
            className,
        ),
        placeholder,
        value,
        disabled,
        type,
        autoFocus,
    }

    return(
        <div className={containerClassName}>
            {label && (
                <label 
                    htmlFor={inputId}
                    className="mb-1 block font-medium text-sm"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {!textArea && (
                    <input 
                        {...props}
                    />
                )}
                {textArea && (
                    <textarea
                        style={{ minHeight: 100 }} 
                        {...props}
                    />
                )}
                {disabled && (
                    <LockIcon 
                        size={18}
                        className="absolute right-4 top-2/4 -translate-y-2/4"
                    />
                )}
            </div>
        </div>
    )
}