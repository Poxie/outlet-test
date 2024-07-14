"use client";
import React from 'react';
import PageBanner from "../page-banner";
import SicklaNotice from '../sickla-notice';
import ProductRow from './ProductRow';
import { useQuery } from '@tanstack/react-query';
import getCategoriesWithProducts from '@/api/products/getCategoriesWithProducts';

export default function Products() {
    const { data: categories } = useQuery({
        queryKey: ['products'],
        queryFn: getCategoriesWithProducts,
    })

    if(!categories) return null;

    return(
        <main className="flex flex-col flex-1">
            <PageBanner 
                className="main-width"
                steps={[
                    { text: 'Start', path: '/' },
                    { text: 'Produkter', path: '/produkter' },
                ]}
            />
            <div className="main-width pt-4 pb-8 flex-1">
                {categories.map(category => (
                    <ProductRow 
                        category={category}
                        key={category.id}
                    />
                ))}
            </div>
            <SicklaNotice />
        </main>
    )
}