"use client";
import React from "react";
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
import useChanges from "@/hooks/useChanges";
import useUpdateProps from "@/hooks/useUpdateProps";

export default function Category({ categoryId }: {
    categoryId: string;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync: updateCategoryAPI, isPending: loadingUpdate } = useUpdateCategory(categoryId);
    const { mutateAsync: deleteProductsAPI, isPending: loadingDelete } = useDeleteCategoryProducts(categoryId);
    const { mutateAsync: addProductsAPI, isPending, isPending: loadingAdd } = useAddCategoryProducts(categoryId);

    const { data: category } = useGetCategoryById(categoryId);

    const { state: currentCategory, updateProps, resetProps } = useUpdateProps(category);

    const { changes, hasChanges } = useChanges(currentCategory, category);
    const { feedback, setFeedback, clearFeedback } = useFeedback();
    
    // While fetching category, if not already prefetched
    if(!category || !currentCategory) {
        return null
    }

    // Submitting updates
    const handleSubmit = async () => {        
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
                    onCancel={resetProps}
                    onConfirm={handleSubmit}
                    hasChanges={hasChanges}
                    loading={loading}
                />
            </main>
        </>
    )
}