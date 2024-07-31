import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../button";
import UploadButton from "../upload-button";

export default function FileInput({ containerClassName, className, label, value, onChange, multiple, addText, defaultImage, hasEditButton, editText='Edit' }: {
    label?: string;
    value?: string;
    addText?: string;
    onChange: (base64: string[]) => void;
    multiple?: boolean;
    hasEditButton?: boolean;
    editText?: string;
    className?: string;
    containerClassName?: string;
    defaultImage?: string;
}) {
    const ref = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;

        const images: string[] = [];

        for(const file of Array.from(e.target.files)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                images.push(reader.result as string);

                if(images.length === e.target.files?.length) {
                    onChange(images);

                    if(ref.current) ref.current.value = '';
                }
            }

            reader.readAsDataURL(file);
        }
    }

    const labelId = label?.toLowerCase().replace(' ', '-');
    return(
        <div className={containerClassName}>
            {label && (
                <label 
                    className="mb-1 block text-sm font-medium"
                    htmlFor={labelId}
                >
                    {label}
                </label>
            )}
            <div
                className={twMerge(
                    "relative flex items-center justify-center border-[1px] border-tertiary hover:bg-secondary rounded-md transition-colors bg-no-repeat bg-cover bg-center",
                    className,
                )}
                style={{
                    backgroundImage: value ? `url(${value})` : (
                        defaultImage ? `url(${defaultImage})` : undefined
                    ),
                }}
            >
                <input 
                    id={labelId}
                    type="file" 
                    className="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleChange}
                    multiple={multiple}
                    ref={ref}
                />
                {(value || defaultImage) && hasEditButton && (
                    <UploadButton 
                        text={editText}
                        className="absolute top-0 left-0 w-full"
                        onChange={image => onChange([image])}
                    />
                )}
                {addText && !value && !defaultImage && (
                    <span>
                        {addText}
                    </span>
                )}
            </div>
        </div>
    )
}