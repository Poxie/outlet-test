// This would be replaced with server side rendering & fetching data from a database
import categories from '@/assets/json/categories.json';
import Link from "next/link";
import HomeProductRow from "./HomeProductRow";

export default function HomeProducts() {
    return(
        <section className="main-width p-section">
            <h2 className="mb-10 text-3xl text-center">
                Upptäck vårt sortiment
            </h2>
            {categories.map(category => (
                <HomeProductRow 
                    title={category.title}
                    products={category.products}
                    key={category.categoryId}
                />
            ))}
            <div className="mt-8 flex justify-center relative">
                <Link
                    className="px-5 bg-primary after:z-[-1] after:absolute after:top-2/4 after:left-0 after:-translate-y-2/4 after:w-full after:h-[1px] after:bg-tertiary"
                    href={'/produkter'}
                >
                    Utforska mer
                </Link>
            </div>
        </section>
    )
}