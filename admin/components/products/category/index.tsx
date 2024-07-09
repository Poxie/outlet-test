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
import Feedback from "@/components/feedback";
import useFeedback from "@/hooks/useFeedback";
import { TEMP_PREFIX } from "@/utils/constants";

export default function Category({ categoryId }: {
    categoryId: string;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync: updateCategoryAPI, isPending: loadingUpdate } = useUpdateCategory(categoryId);
    const { mutateAsync: deleteProductsAPI, isPending: loadingDelete } = useDeleteCategoryProducts(categoryId);
    const { mutateAsync: addProductsAPI, isPending, isPending: loadingAdd } = useAddCategoryProducts(categoryId);

    const { data: category } = useGetCategoryById(categoryId);

    const [currentCategory, setCurrentCategory] = useState(category);

    const { feedback, setFeedback, clearFeedback } = useFeedback();

    // Make sure currentCategory is up to date
    useEffect(() => {
        setCurrentCategory(category);
    }, [category]);
    
    // While fetching category, if not already prefetched
    if(!category || !currentCategory) {
        return null
    }

    // Submitting updates
    const handleSubmit = async () => {
        const changes = getChanges();
        
        // Separate products from category information
        const { products, ...rest } = changes;

        const updateRequests: Promise<any>[] = [];

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

            // Pushing update category request
            updateRequests.push(updateCategoryAPI({ changes }));
        }

        // Update products, if any changes
        if(products) {
            // Check for products to remove
            const previousProductIds = category.products.map(product => product.id);
            const newProductIds = products.map(product => product.id);
            const productIdsToRemove = previousProductIds.filter(id => !newProductIds.includes(id));

            // Pushing delete products request
            if(productIdsToRemove.length > 0) {
                updateRequests.push(deleteProductsAPI({ productIds: productIdsToRemove }));
            }

            // Check for products to add
            const productsToAdd = products.filter(product => product.id.startsWith(TEMP_PREFIX));
            const productImagestoAdd = productsToAdd.map(product => product.imageURL);

            // Pushing add products request
            if(productsToAdd.length > 0) {
                updateRequests.push(addProductsAPI({ images: productImagestoAdd }));
            }
        }

        // Wait for all requests to finish
        try {
            await Promise.all(updateRequests);
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
            return;
        }

        // Refetch category
        refetchQuery(['category', categoryId]);
    }
    
    // Reset category
    const reset = () => {
        setCurrentCategory(category);
        clearFeedback()
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
    const updateProps = (changes: Partial<CategoryWithProducts>) => {
        setCurrentCategory(prev => {
            if(!prev) return prev;

            return{
                ...prev,
                ...changes,
            }
        })
        clearFeedback();
    }

    const loading = loadingUpdate || loadingDelete || loadingAdd;

    const value = {
        category: currentCategory,
        updateProps,
    }
    return(
        <>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'Products', href: '/produkter' },
                    { text: category.title, href: `/produkter/${category.id}` },
                ]}
            />
            <main className="p-5">
                {feedback && (
                    <Feedback 
                        {...feedback}
                        className="mb-5"
                    />
                )}
                <SectionHeader 
                    title="Category information"
                    className="mb-2"
                />
                <Section>
                    <CategoryInformation {...value} />
                </Section>
                <SectionHeader
                    title="Products"
                    className="mt-5 mb-2"
                />
                <Section>
                    <CategoryProducts 
                        {...value}
                    />
                </Section>

                <HasChangesNotice 
                    onCancel={reset}
                    onConfirm={handleSubmit}
                    hasChanges={getHasChanges()}
                    loading={loading}
                />
            </main>
        </>
    )
}