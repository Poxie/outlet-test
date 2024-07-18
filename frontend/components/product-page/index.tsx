"use client";
import ProductHeader from './ProductHeader';
import ProductList from './ProductList';
import SicklaNotice from '../sickla-notice';
import PageBanner from '../page-banner';
import { Category, ProductGroup } from '@/utils/types';

export default function Products({ header, groups }: {
    header?: Category;
    groups: ProductGroup[];
}) {
    const bannerText = header?.title || groups[0].name;
    const path = header ? `/${header.id}` : `/${groups[0].id}`;
    return(
        <main>
            <PageBanner 
                className="main-width"
                steps={[
                    { text: 'Start', path: '/' },
                    { text: bannerText, path },
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