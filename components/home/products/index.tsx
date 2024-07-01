import Link from "next/link";
import HomeProductRow from "./HomeProductRow";

// The products along with their images & category should be fetched from the API
const PRODUCT_IDS = ['1','2','3','4','5','6','7'];

export default function HomeProducts() {
    return(
        <section className="main-width p-section">
            <h2 className="mb-10 text-3xl text-center">
                Upptäck vårt sortiment
            </h2>
            <HomeProductRow 
                title="Sommar"
                productIds={PRODUCT_IDS}
            />
            <HomeProductRow 
                title="Sommarmode"
                productIds={PRODUCT_IDS}
            />
            <HomeProductRow 
                title="Uteplatsen"
                productIds={PRODUCT_IDS}
            />
            <div className="mt-8 flex justify-center relative">
                <Link
                    className="px-5 bg-primary after:z-[-1] after:absolute after:top-2/4 after:left-0 after:-translate-y-2/4 after:w-full after:h-[1px] after:bg-tertiary"
                    href={'/products'}
                >
                    Utforska mer
                </Link>
            </div>
        </section>
    )
}