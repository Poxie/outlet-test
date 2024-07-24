"use client";
import ProductList from './ProductList';
import SicklaNotice from '../sickla-notice';
import PageBanner from '../page-banner';
import { ProductPage } from '@/utils/types';
import { usePathname } from 'next/navigation';

export default function Products({ header, groups }: {
    header: ProductPage['header'];
    groups: ProductPage['groups'];
}) {
    const path = usePathname();

    return(
        <main>
            <PageBanner 
                className="main-width"
                steps={[
                    { text: 'Start', path: '/' },
                    { text: header.title, path },
                ]}
            />
            <div className="pb-8 main-width divide-y-[1px] divide-tertiary">
                <ProductList 
                    groups={groups}
                />
            </div>
            <SicklaNotice />
        </main>
    )
}