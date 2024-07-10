"use client";
import PageBanner from "@/components/page-banner"
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import useGetStoreById from "@/hooks/stores/useGetStoreById";
import StoreDetails from "./StoreDetails";
import StoreContactInformation from "./StoreContactInformation";
import StoreInternalInformation from "./StoreInternalInformation";
import useUpdateProps from "@/hooks/useUpdateProps";
import useChanges from "@/hooks/useChanges";
import HasChangesNotice from "@/components/has-changes-notice";
import useUpdateStore from "@/hooks/stores/useUpdateStore";
import useFeedback from "@/hooks/useFeedback";
import Feedback from "@/components/feedback";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";

export default function Store({ storeId }: {
    storeId: string;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useUpdateStore(storeId);

    const { data: store } = useGetStoreById(storeId);

    const { feedback, setFeedback, clearFeedback } = useFeedback();

    const { state: currentStore, updateProps, resetProps } = useUpdateProps(store, {
        onReset: clearFeedback,
        onUpdate: clearFeedback,
    });

    const { changes, hasChanges } = useChanges(currentStore, store);

    if(!store || !currentStore) return null;

    const updateStore = async () => {
        try {
            await mutateAsync({ changes });
            refetchQuery(['store', storeId]);
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            });
        }
    }

    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Stores', href: '/stores' },
                { text: store.name, href: `/stores/${store.id}` },
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
                title="Store details"
                className="mb-2"
            />
            <Section>
                <StoreDetails 
                    store={currentStore}
                    updateProps={updateProps}
                />
            </Section>
            <SectionHeader 
                title="Store contact information"
                className="mt-5 mb-2"
            />
            <Section>
                <StoreContactInformation 
                    store={currentStore}
                    updateProps={updateProps}
                />
            </Section>
            <SectionHeader 
                title="Internal information"
                className="mt-5 mb-2"
            />
            <Section>
                <StoreInternalInformation 
                    storeNumber={currentStore.id}
                    updateProps={updateProps}
                    canEditStoreNumber={false}
                />
            </Section>

            <HasChangesNotice 
                hasChanges={hasChanges}
                loading={isPending}
                onCancel={resetProps}
                onConfirm={updateStore}
            />
        </main>
        </>
    )
}