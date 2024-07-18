import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import HomeProductList from './HomeProductList';
import Link from 'next/link';
import getHomeProductList from '@/api/products/getHomeProductList';

export default async function HomeProducts() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['product-list'],
        queryFn: getHomeProductList,
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <section className="main-width p-section">
                <h2 className="mb-10 text-3xl text-center">
                    Upptäck vårt sortiment
                </h2>
                <HomeProductList />
                <div className="mt-8 flex justify-center relative">
                    <Link
                        className="px-5 bg-primary after:z-[-1] after:absolute after:top-2/4 after:left-0 after:-translate-y-2/4 after:w-full after:h-[1px] after:bg-tertiary"
                        href={'/produkter'}
                    >
                        Utforska mer
                    </Link>
                </div>
            </section>
        </HydrationBoundary>
    )
}