import Image from "next/image";
import { useCategory } from "."
import { TEMP_PREFIX } from "@/utils/constants";
import { useRef } from "react";
import CategoryProduct from "./CategoryProduct";
import { Product } from "@/utils/types";

export default function CategoryProducts() {
    const { category, updateCategory } = useCategory();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const removeProduct = (productId: string) => {
        updateCategory('products', category.products.filter(product => product.id !== productId));
    }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!fileInputRef.current) return;

        const files = event.target.files;
        if(!files) return;

        const newProducts: Product[] = [];

        for(const file of Array.from(files)) {
            const fileReader = new FileReader();

            fileReader.onload = async () => {
                const imageURL = fileReader.result as string;

                newProducts.push({
                    id: `${TEMP_PREFIX}${Math.random()}`,
                    parentId: category.id,
                    imageURL,
                });

                if(newProducts.length >= files.length) {
                    updateCategory('products', [...category.products, ...newProducts]);
                }
            }

            fileReader.readAsDataURL(file);
        }

        fileInputRef.current.value = '';
    }

    return(
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-2">
            {category.products.map(product => (
                <CategoryProduct 
                    onRemove={removeProduct}
                    product={product}
                    key={product.id}
                />
            ))}
            <div className="relative flex items-center justify-center aspect-square rounded-md border-[1px] border-tertiary hover:bg-secondary transition-colors">
                <input 
                    multiple
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="opacity-0 absolute w-full h-full cursor-pointer"
                    onChange={onFileChange}
                    ref={fileInputRef}
                />
                <span>
                    Add product
                </span>
            </div>
        </div>
    )
}