import { MutableProductGroupProps, ProductGroup } from "@/utils/types";
import useUpdateProps from "../useUpdateProps";
import useChanges from "../useChanges";
import { useFeedback } from "@/contexts/feedback";
import useMutateUpdateProductGroup from "./useMutateUpdateProductGroup";
import useRefetchQuery from "../react-query/useRefetchQuery";

export default function useUpdateProductGroup(productGroup: ProductGroup) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateUpdateProductGroup(productGroup.id);

    const { state: currentProductGroup, updateProps } = useUpdateProps(productGroup);
    const { changes, hasChanges } = useChanges(currentProductGroup, productGroup);

    const { setFeedback } = useFeedback();

    const updateProductGroup = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            setFeedback({
                message: 'No changes detected',
                type: 'danger',
            });
            return;
        }

        // Separate the bannerURL from the rest of the changes to comply with the API format
        const { bannerURL, ...rest } = changes;

        const groupData: Partial<MutableProductGroupProps> = rest;
        if(bannerURL) {
            groupData.banner = bannerURL;
        }

        try {
            await mutateAsync(groupData);

            setFeedback({
                message: 'Product group updated successfully',
                type: 'success',
            })

            if(productGroup.groupType === 'BLOG') {
                refetchQuery(['blog-posts']);
            } else {
                refetchQuery(['product-groups']);
            }
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            });
        }
    }

    return {
        currentProductGroup,
        updateProps,
        updateProductGroup,
        isPending,
    }
}