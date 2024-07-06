import { WeeklyProduct } from "@/utils/types"
import WeekProduct from "./WeekProduct";
import { useRef, useState } from "react";
import useAddWeeklyProducts from "@/hooks/useAddWeeklyProducts";

const TEMP_PREFIX = 'temp_';
export default function WeekProducts({ date, products: _products }: {
    products: WeeklyProduct[];
    date: string;
}) {
    const { mutateAsync: addProducts } = useAddWeeklyProducts();

    const [products, setProducts] = useState(_products);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSave = async () => {
        const productsToAdd = products.filter(product => product.id.startsWith(TEMP_PREFIX));
        const productImagesToAdd = productsToAdd.map(product => product.imageURL);

        try {
            const products = await addProducts({ date, images: productImagesToAdd });
            setProducts(products);
        } catch(error) {
            console.error(error);
        }
    }

    const convertToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        })
    }
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!inputRef.current) return;

        const files = e.target.files;
        if(!files) return;

        const base64Images = [];
        for(const file of Array.from(files)) {
            const base64 = await convertToBase64(file);
            base64Images.push(base64);
        }

        const newProducts = base64Images.map(imageURL => ({ 
            id: `${TEMP_PREFIX}${Math.random()}`,
            imageURL,
            date,
        }));

        setProducts([...products, ...newProducts]);
        inputRef.current.value = '';
    }

    return(
        <>
        <div className="grid grid-cols-8 gap-2">
            {products.map(product => (
                <WeekProduct 
                    product={product}
                    key={product.id}
                />
            ))}
            <div className="relative aspect-square flex items-center justify-center border-[1px] border-tertiary hover:bg-secondary transition-colors rounded-md">
                <input 
                    multiple
                    type="file" 
                    accept=".jpg,.jpeg,.png"
                    className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                    onChange={handleInputChange}
                    ref={inputRef}
                />
                <span className="pointer-events-none">
                    Add product
                </span>
            </div>
        </div>
        <button onClick={handleSave}>
            Save
        </button>
        </>
    )
}