"use client";
import React, { useEffect, useRef, useState } from "react";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import CategoryInformation from "./CategoryInformation";
import useGetCategoryById from "@/hooks/categories/useGetCategoryById";
import { CategoryWithProducts, ProductCategory } from "@/utils/types";
import PageBanner from "@/components/page-banner";
import HasChangesNotice from "@/components/has-changes-notice";
import CategoryProducts from "./CategoryProducts";
import useUpdateCategory from "@/hooks/categories/useUpdateCategory";
import useDeleteCategoryProducts from "@/hooks/categories/useDeleteCategoryProducts";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";

type UpdateCategoryFn = (property: keyof CategoryWithProducts, value: any) => void;

const CategoryContext = React.createContext<null | {
    category: CategoryWithProducts;
    updateCategory: UpdateCategoryFn;
}>(null);

export const useCategory = () => {
    const context = React.useContext(CategoryContext);
    if(!context) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
}

export const TEMP_IMAGE_PREFIX = 'temp_';
export default function Category({ categoryId }: {
    categoryId: string;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync: updateCategoryAPI } = useUpdateCategory(categoryId);
    const { mutateAsync: deleteProductsAPI } = useDeleteCategoryProducts(categoryId);

    const { data: category } = useGetCategoryById(categoryId);

    const [currentCategory, setCurrentCategory] = useState(category);
    const [loading, setLoading] = useState(false);

    // Make sure currentCategory is up to date
    useEffect(() => {
        setCurrentCategory(category);
    }, [category]);
    
    // While fetching category, if not already prefetched
    if(!category ||!currentCategory) {
        return null
    }

    // Submitting updates
    const handleSubmit = async () => {
        const changes = getChanges();
        
        // Separate products from category information
        const { products, ...rest } = changes;

        setLoading(true);

        // Update category information, if any changes
        if(Object.keys(rest).length > 0) {
            await updateCategoryAPI({ changes: rest });
        }

        // Update products, if any changes
        if(products) {
            const previousProductIds = category.products.map(product => product.id);
            const newProductIds = products.map(product => product.id);
            const productIdsToRemove = previousProductIds.filter(id => !newProductIds.includes(id));

            // Remove products
            if(productIdsToRemove.length > 0) {
                await deleteProductsAPI({ productIds: productIdsToRemove });
            }
        }

        // Refetch category
        refetchQuery(['category', categoryId]);
        setLoading(false);
    }
    
    // Reset category
    const reset = () => {
        setCurrentCategory(category);
    }

    // Function to get category changes
    const getChanges = () => {
        const changes = Object.entries(currentCategory).filter(([key, value]) => {
            return category[key as keyof CategoryWithProducts] !== value;
        });

        return Object.fromEntries(changes) as Partial<CategoryWithProducts>;
    }
    const getHasChanges = () => Object.keys(getChanges()).length > 0;

    // Update & display has changes notice
    const updateCategory: UpdateCategoryFn = (property, value) => {
        setCurrentCategory(prev => {
            if(!prev) return prev;

            return {
                ...prev,
                [property]: value,
            }
        })
    }

    const value = {
        category: currentCategory,
        updateCategory,
    }
    return(
        <CategoryContext.Provider value={value}>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'Products', href: '/produkter' },
                    { text: category.title, href: `/produkter/${category.id}` },
                ]}
            />
            <main className="p-5">
                <SectionHeader 
                    title="Category information"
                    className="mb-2"
                />
                <Section>
                    <CategoryInformation />
                </Section>
                <SectionHeader
                    title="Products"
                    className="mt-5 mb-2"
                />
                <Section>
                    <CategoryProducts />
                </Section>
            </main>
            <HasChangesNotice 
                onCancel={reset}
                onConfirm={handleSubmit}
                hasChanges={getHasChanges()}
                loading={loading}
            />
        </CategoryContext.Provider>
    )
}