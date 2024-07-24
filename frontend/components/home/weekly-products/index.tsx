import SectionHeader from "@/components/section-header";
import HomeWeeklyProductList from "./HomeWeeklyProductList";
import getCurrentWeeksProducts from "@/api/weekly-products/getCurrentWeeksProducts";

export default async function HomeWeeklyProducts() {
    const week = await getCurrentWeeksProducts();

    return(
        <section className="p-section bg-c-primary">
            <div className="main-width">
                <SectionHeader 
                    className="text-light"
                    buttonHref="/veckans-varor"
                    buttonText="Se alla varor"
                >
                    Veckans varor
                </SectionHeader>
                <div className="mt-4 p-4 bg-primary rounded-md">
                    <HomeWeeklyProductList products={week.products} />
                </div>
            </div>
        </section>
    )
}