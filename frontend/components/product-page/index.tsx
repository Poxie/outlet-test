"use client";
import ProductList from './ProductList';
import SicklaNotice from '../sickla-notice';
import PageBanner from '../page-banner';
import { ProductPage } from '@/utils/types';
import { usePathname } from 'next/navigation';

export default function Products({ header: { title }, groups }: {
    header: ProductPage['header'];
    groups: ProductPage['groups'];
}) {
    const path = usePathname();

    const header = {
        title,
        path,
    }
    return(
        <main>
            <ProductList 
                groups={groups}
                header={header}
                className="pb-8 main-width"
            />
            <SicklaNotice />
        </main>
    )
}