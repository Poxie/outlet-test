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
import useAddCategoryProducts from "@/hooks/categories/useAddCategoryProducts";

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

    const { mutateAsync: updateCategoryAPI, isPending: loadingUpdate } = useUpdateCategory(categoryId);
    const { mutateAsync: deleteProductsAPI, isPending: loadingDelete } = useDeleteCategoryProducts(categoryId);
    const { mutateAsync: addProductsAPI, isPending, isPending: loadingAdd } = useAddCategoryProducts(categoryId);

    const { data: category } = useGetCategoryById(categoryId);

    const [currentCategory, setCurrentCategory] = useState(category);

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

        // Update category information, if any changes
        if(Object.keys(rest).length > 0) {
            // Update bannerURL key to banner, as backend expects
            const propsToUpdateObj = Object.entries(rest).map(([key, value]) => {
                if(key === 'bannerURL') {
                    return ['banner', value];
                }
                return [key, value];
            })
            const changes = Object.fromEntries(propsToUpdateObj) as Partial<ProductCategory>;

            await updateCategoryAPI({ changes });
        }

        // Update products, if any changes
        if(products) {
            // Check for products to remove
            const previousProductIds = category.products.map(product => product.id);
            const newProductIds = products.map(product => product.id);
            const productIdsToRemove = previousProductIds.filter(id => !newProductIds.includes(id));

            // Remove products
            if(productIdsToRemove.length > 0) {
                await deleteProductsAPI({ productIds: productIdsToRemove });
            }

            // Check for products to add
            const productsToAdd = products.filter(product => product.id.startsWith(TEMP_IMAGE_PREFIX));
            const productImagestoAdd = productsToAdd.map(product => product.imageURL);

            // Add products
            if(productsToAdd.length > 0) {
                await addProductsAPI({ images: productImagestoAdd });
            }
        }

        // Refetch category
        refetchQuery(['category', categoryId]);
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

    const loading = loadingUpdate || loadingDelete || loadingAdd;

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