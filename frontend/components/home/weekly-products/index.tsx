import SectionHeader from "@/components/section-header";
import getCurrentWeeksProducts from "@/api/weekly-products/getCurrentWeeksProducts";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HomeWeeklyProductList from "./HomeWeeklyProductList";

export default async function HomeWeeklyProducts() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['weeklyProducts'],
        queryFn: getCurrentWeeksProducts,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
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
                        <HomeWeeklyProductList />
                    </div>
                </div>
            </section>
        </HydrationBoundary>
    )
}