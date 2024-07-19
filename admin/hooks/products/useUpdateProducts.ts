import { Product } from "@/utils/types";
import { useState } from "react";
import useMutateCreateProducts from "./useMutateCreateProducts";
import useMutateDeleteProducts from "./useMutateDeleteProducts";
import { useFeedback } from "@/contexts/feedback";
import useMutateProductPositions from "./useMutateProductPositions";
import useRefetchQuery from "../react-query/useRefetchQuery";

export default function useUpdateProducts(parentId: string, initialProducts: Product[]) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync: addProducts, isPending: addPending } = useMutateCreateProducts(parentId);
    const { mutateAsync: deleteProducts, isPending: deletePending } = useMutateDeleteProducts(parentId);
    const { mutateAsync: updateProductPositions, isPending: positionsPending } = useMutateProductPositions(parentId);

    const { setFeedback } = useFeedback();

    const [currentProducts, setCurrentProducts] = useState(initialProducts);

    const updateProducts = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if there are any changes
        if(JSON.stringify(initialProducts) === JSON.stringify(currentProducts)) {
            setFeedback({
                type: 'danger',
                message: 'No changes detected',
            });
            return;
        }

        const previousProducts = initialProducts;
        const newProducts = currentProducts;

        const previousProductIds = previousProducts.map(p => p.id);
        const newProductIds = newProducts.map(p => p.id);

        const productsToAdd = newProducts.filter(product => !previousProductIds.includes(product.id));
        const productsToRemove = previousProducts.filter(product => !newProductIds.includes(product.id));
        const newPositions = newProducts.map(p => ({
            id: p.id,
            position: p.position,
        }));

        try {
            if(productsToAdd.length) {
                const createdProducts = await addProducts(productsToAdd.map(p => p.imageURL));
                if(createdProducts) {
                    for(let i = 0; i < createdProducts.length; i++) {
                        const addedProduct = productsToAdd[i];
                        newPositions.find(p => p.id === addedProduct.id)!.id = createdProducts[i].id;
                    }
                }
            }
            if(productsToRemove.length) {
                await deleteProducts(productsToRemove.map(p => p.id));
            }

            if(newPositions.length) {
                await updateProductPositions(newPositions);
            }

            setFeedback({
                type: 'success',
                message: 'Products updated successfully',
            })

            refetchQuery(['products', parentId]);
            refetchQuery(['product-groups']);
        } catch(error: any) {
            setFeedback({
                type: 'danger',
                message: error.message,
            })
        }
    }

    const isPending = deletePending || addPending || positionsPending;
    return {
        currentProducts,
        setCurrentProducts,
        updateProducts,
        isPending,
    }
}