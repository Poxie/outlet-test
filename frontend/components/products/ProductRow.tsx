import { Category } from "@/utils/types";
import ProductCarousel from "../product-carousel";
import SectionHeader from "../section-header";

export default function ProductRow({ category: { id, title, products } }: {
    category: Category;
}) {
    return(
        <div className="mb-8">
            <SectionHeader
                buttonText="Visa fler"
                buttonHref={`/${id}`}
            >
                {title}
            </SectionHeader>
            <ProductCarousel 
                products={products}
            />
        </div>
    )
}