import ProductCarousel from "../product-carousel";
import SectionHeader from "../section-header";

export default function ProductRow({ title, products }: {
    title: string;
    products: string[];
}) {
    return(
        <div className="mb-8">
            <SectionHeader
                buttonText="Visa fler"
                buttonHref={`/produkter/${title.toLowerCase()}`}
            >
                {title}
            </SectionHeader>
            <ProductCarousel 
                products={products}
            />
        </div>
    )
}