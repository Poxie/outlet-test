import { CategoryWithProducts, MutableCategoryProps, Product } from "@/utils/types";
import useUpdateProps from "../useUpdateProps";
import useChanges from "../useChanges";
import useMutateUpdateCategory from "./useMutateUpdateCategory";
import useAddCategoryProducts from "./useAddCategoryProducts";
import useDeleteCategoryProducts from "./useDeleteCategoryProducts";
import { TEMP_PREFIX } from "@/utils/constants";
import useRefetchQuery from "../react-query/useRefetchQuery";
import { useFeedback } from "@/contexts/feedback";

export default function useUpdateCategory(initialCategory: CategoryWithProducts) {
    const refetchQuery = useRefetchQuery();

    const { setFeedback } = useFeedback();

    const { mutateAsync, isPending: loadingCategory } = useMutateUpdateCategory(initialCategory.id);
    const { mutateAsync: addProducts, isPending: loadingAddProducts } = useAddCategoryProducts(initialCategory.id);
    const { mutateAsync: removeProducts, isPending: loadingRemoveProducts } = useDeleteCategoryProducts(initialCategory.id);
    
    const { state: currentCategory, updateProps } = useUpdateProps(initialCategory);

    const { changes, hasChanges } = useChanges(currentCategory, initialCategory);

    const updateCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            setFeedback({
                type: 'danger',
                message: 'No changes detected',
            })
            return;
        }

        // Split up detail and products changes into separate objects
        const { products, ...categoryChanges } = changes;

        // Split up added and removed products
        const addedProducts: Product[] = [];
        const removedProducts: Product[] = [];

        if(products) {
            // Check what products have been added
            for(const product of products) {
                if(!product.id.startsWith(TEMP_PREFIX)) continue;
                addedProducts.push(product);
            }

            // Check what products have been removed
            for(const product of initialCategory.products) {
                if(!products.find(p => p.id === product.id)) {
                    removedProducts.push(product);
                }
            }
        }

        // Array of requests to be made
        const requests = [];

        // If there are category changes, add the request
        if(Object.keys(categoryChanges).length) {
            // Correct changes to match the API format
            const { title, description, bannerURL } = categoryChanges;

            const detailsData = {
                title,
                description,
                banner: bannerURL,
            };

            requests.push(mutateAsync(detailsData));
        }

        // If there are added products, add the request
        if(addedProducts.length) {
            const productImages = addedProducts.map(product => product.imageURL);
            requests.push(addProducts(productImages));
        }

        // If there are removed products, add the request
        if(removedProducts.length) {
            const removedIds = removedProducts.map(product => product.id);
            requests.push(removeProducts(removedIds));
        }

        // Execute all requests
        try{
            await Promise.all(requests);

            setFeedback({
                type: 'success',
                message: 'Category has been updated',
            })
           
            refetchQuery(['categories']);
            refetchQuery(['category', initialCategory.id]);
        } catch(error: any) {
            setFeedback({
                type: 'danger',
                message: error.message,
            })
        }
    }

    const isPending = loadingCategory || loadingAddProducts || loadingRemoveProducts;
    return {
        currentCategory,
        updateProps,
        updateCategory,
        isPending,
    };
}