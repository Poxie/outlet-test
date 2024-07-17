import { Category, MutableCategoryProps } from "@/utils/types";
import useUpdateProps from "../useUpdateProps";
import useChanges from "../useChanges";
import useMutateUpdateCategory from "./useMutateUpdateCategory";
import { useFeedback } from "@/contexts/feedback";
import useRefetchQuery from "../react-query/useRefetchQuery";

export default function useUpdateCategory(initialCategory: Category) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateUpdateCategory(initialCategory.id);
    
    const { state: currentCategory, updateProps } = useUpdateProps(initialCategory);
    
    const { changes, hasChanges } = useChanges(currentCategory, initialCategory);

    const { setFeedback } = useFeedback();

    const updateCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            setFeedback({
                message: 'No changes detected',
                type: 'danger',
            })
            return;
        }

        // Extract immutable properties & banner to replace it with api expected format
        const { id, createdAt, groupCount, bannerURL, ...rest } = changes;

        const changesData: Partial<MutableCategoryProps> = {
            ...rest,
            banner: changes.bannerURL,
        }

        try {
            await mutateAsync(changesData);
            
            setFeedback({
                message: 'Category has been updated',
                type: 'success',
            })

            refetchQuery(['categories']);
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }

    return {
        currentCategory,
        updateProps,
        updateCategory,
        isPending,
    }
}