import Image from "next/image";
import Button from "@/components/button";
import { useRef } from "react";
import { CategoryWithProducts } from "@/utils/types";

export default function CategoryBanner({ category, updateProps }: {
    category: CategoryWithProducts;
    updateProps: (changes: Partial<CategoryWithProducts>) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;

        const file = e.target.files[0];
        
        const reader = new FileReader();
        reader.onloadend = () => {
            updateProps({ bannerURL: reader.result as string });
        }

        reader.readAsDataURL(file);
    }

    const openFileInput = () => fileInputRef.current?.click();
    
    return(
        <div className="md:w-[390px] aspect-video">
            <label 
                className="block mb-1 font-medium"
                htmlFor="banner"
            >
                Category banner
            </label>
            <div className="relative border-[1px] border-tertiary rounded-md overflow-hidden">
                <input 
                    id="banner"
                    type="file"
                    onChange={onFileChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    ref={fileInputRef}
                />
                {category.bannerURL && (
                    <>
                    <Image
                        className="w-full aspect-video object-cover" 
                        src={category.bannerURL}
                        width={400}
                        height={200}
                        alt=""
                    />
                    <Button 
                        type="secondary"
                        className="py-3 absolute top-2 right-2 text-sm"
                        onClick={openFileInput}
                    >
                        Edit banner
                    </Button>
                    </>
                )}
                {!category.bannerURL && (
                    <button 
                        className="w-full aspect-video"
                        onClick={openFileInput}
                    >
                        Add banner
                    </button>
                )}
            </div>
        </div>
    )
}