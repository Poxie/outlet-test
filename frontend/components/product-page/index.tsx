"use client";
import ProductHeader from './ProductHeader';
import ProductList from './ProductList';
import SicklaNotice from '../sickla-notice';
import PageBanner from '../page-banner';
import { useQuery } from '@tanstack/react-query';
import getProductGroup from '@/api/products/getProductGroup';

export default function Products({ productGroupId }: {
    productGroupId: string;
}) {
    const { data: productGroup } = useQuery({
        queryKey: ['product-groups', productGroupId],
        queryFn: () => getProductGroup(productGroupId),
    })

    if(!productGroup) return null;

    const { name, description, bannerURL, products } = productGroup;
    return(
        <main>
            <PageBanner 
                className="main-width"
                steps={[
                    { text: 'Start', path: '/' },
                    { text: name, path: `/${productGroupId}` },
                ]}
            />
            <div className="pb-8 main-width">
                <ProductHeader 
                    title={name}
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