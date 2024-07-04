import React from 'react';
import categories from '@/assets/json/categories.json';
import PageBanner from "../page-banner";
import SicklaNotice from '../sickla-notice';
import ProductRow from './ProductRow';

export default function Products() {
    return(
        <main>
            <PageBanner 
                className="main-width"
                steps={[
                    { text: 'Start', path: '/' },
                    { text: 'Produkter', path: '/produkter' },
                ]}
            />
            <div className="main-width pt-4 pb-8">
                {categories.map(category => (
                    <ProductRow 
                        title={category.title}
                        products={category.products}
                        key={category.categoryId}
                    />
                ))}
            </div>
            <SicklaNotice />
        </main>
    )
}