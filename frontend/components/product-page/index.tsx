"use client";
import ProductHeader from './ProductHeader';
import ProductList from './ProductList';
import SicklaNotice from '../sickla-notice';
import PageBanner from '../page-banner';
import { useQuery } from '@tanstack/react-query';
import getCategoryWithProducts from '@/api/products/getCategoryWithProducts';

export default function Products({ categoryId }: {
    categoryId: string;
}) {
    const { data: category } = useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => getCategoryWithProducts(categoryId),
    })

    if(!category) return null;

    const { title, description, bannerURL, products } = category;
    return(
        <main>
            <PageBanner 
                className="main-width"
                steps={[
                    { text: 'Start', path: '/' },
                    { text: 'Produkter', path: '/produkter' },
                    { text: category.title, path: `/produkter/${category.title.toLowerCase()}` },
                ]}
            />
            <div className="pb-8 main-width">
                <ProductHeader 
                    categoryId={categoryId}
                    title={title}
                    description={description}
                    image={bannerURL}
                />
                <ProductList 
                    products={products}
                    className="mt-4"
                />
            </div>
            <SicklaNotice />
        </main>
    )
}