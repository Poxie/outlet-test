import { getEmptyProductGroupObject } from "@/utils";
import useUpdateProps from "../useUpdateProps";
import useMutateCreateProductGroup from "./useMutateCreateProductGroup";
import { useFeedback } from "@/contexts/feedback";
import useRefetchQuery from "../react-query/useRefetchQuery";
import { useModal } from "@/contexts/modal";
import { ProductGroup, ProductGroupType } from "@/utils/types";

const initialProductGroup = (props: Partial<ProductGroup>) => getEmptyProductGroupObject(props);
export default function useCreateProductGroup(options?: {
    groupType?: ProductGroupType;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateCreateProductGroup();
    
    const { state: currentProductGroup, updateProps } = useUpdateProps(initialProductGroup({ groupType: options?.groupType }));

    const { closeModal } = useModal();
    const { setFeedback } = useFeedback();

    const createProductGroup = async (e: React.FormEvent) => {
        e.preventDefault();

        const { bannerURL, name, description, groupType } = currentProductGroup;
        
        const groupData = {
            name,
            description,
            banner: bannerURL,
            parentId: null,
            groupType,
        }

        try {
            await mutateAsync(groupData);

            setFeedback({
                message: 'Product group added successfully',
                type: 'success',
            })

            if(groupType === 'BLOG') {
                refetchQuery(['blog-posts']);
            } else {
                refetchQuery(['product-groups']);
            }
            closeModal();
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }

    return {
        currentProductGroup,
        updateProps,
        createProductGroup,
        isPending,
    }
}