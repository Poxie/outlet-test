import { CategoryWithProducts, Product } from "@/utils/types"
import CategoryProduct from "./CategoryProduct";
import { twMerge } from "tailwind-merge";
import FileInput from "@/components/file-input";
import { getEmptyProductObject } from "@/utils";

export default function CategoryProducts({ className, category, updateProps }: {
    category: CategoryWithProducts;
    updateProps: (props: Partial<CategoryWithProducts>) => void;
    className?: string;
}) {
    const onProductRemove = (id: string) => {
        updateProps({ products: category.products.filter(product => product.id !== id) });
    }
    const onProductAdd = (productImages: string[]) => {
        const products = productImages.map(productImage => {
            return getEmptyProductObject({
                parentId: category.id,
                imageURL: productImage,
            });
        })

        updateProps({ products: [...category.products, ...products] });
    }

    return(
        <div className={twMerge(
            "grid gap-1 grid-cols-3",
            className,
        )}>
            {category.products.map(product => (
                <CategoryProduct 
                    product={product}
                    onRemove={onProductRemove}
                    key={product.id}
                />
            ))}
            <FileInput 
                addText="Add product"
                onChange={onProductAdd}
                className="aspect-square"
                multiple
            />
        </div>
    )
}