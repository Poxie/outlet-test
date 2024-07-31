import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import SearchImages from "./SearchImages";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";

export default function UploadButton({ className, onChange, text='Upload' }: {
    text?: string;
    className?: string;
    onChange: (image: string) => void;
}) {
    const [isSearchingImages, setIsSearchingImages] = useState<boolean>(false);
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files || !inputRef.current) return;

        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            onChange(reader.result as string);
            reset();
        }

        reader.readAsDataURL(file);
        inputRef.current.value = '';
    }

    const openSearch = () => {
        setIsSearchingImages(true);
        setOptionsVisible(false);
    }
    const toggleOptions = () => {
        setIsSearchingImages(false);
        setOptionsVisible(prev => !prev);
    }
    const onSelect = (image: string) => {
        onChange(image);
        setIsSearchingImages(false);
    }
    const reset = () => {
        setIsSearchingImages(false);
        setOptionsVisible(false);
    }

    useClickOutside(containerRef, reset);

    return(
        <div 
            className={twMerge(
                className,
            )}
            ref={containerRef}
        >
            <div className="p-2 relative w-full flex flex-col items-end justify-end gap-1">
                <input 
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    ref={inputRef}
                    className="hidden"
                    onChange={handleChange}
                />
                <button
                    onClick={toggleOptions}
                    className="p-3 text-sm bg-primary hover:bg-secondary active:bg-tertiary transition-colors rounded shadow"
                    type="button"
                >
                    {text}
                </button>
                <AnimatePresence>
                    {optionsVisible && (
                        <motion.div 
                            className="p-2 w-dropdown grid bg-primary rounded-md border-[1px] border-tertiary shadow-lg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, bounce: false }}
                        >
                            <button
                                type="button"
                                className="p-2 hover:bg-secondary active:bg-tertiary transition-colors rounded"
                                onClick={openSearch}
                            >
                                Search images
                            </button>
                            <button
                                type="button"
                                className="p-2 hover:bg-secondary active:bg-tertiary transition-colors rounded"
                                onClick={() => inputRef.current?.click()}
                            >
                                Upload images
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isSearchingImages && (
                        <SearchImages 
                            onSelect={onSelect}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}