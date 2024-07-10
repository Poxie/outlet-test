"use client";
import PageBanner from "@/components/page-banner";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import StoreDetails from "./StoreDetails";
import { getEmptyStoreObject } from "@/utils";
import useUpdateProps from "@/hooks/useUpdateProps";
import StoreContactInformation from "./StoreContactInformation";
import StoreInternalInformation from "./StoreInternalInformation";
import useChanges from "@/hooks/useChanges";
import HasChangesNotice from "@/components/has-changes-notice";
import useFeedback from "@/hooks/useFeedback";
import useCreateStore from "@/hooks/stores/useCreateStore";
import { useRouter } from "next/navigation";
import Feedback from "@/components/feedback";
import StoreOpeningHours from "./StoreOpeningHours";

const INITIAL_STORE = getEmptyStoreObject();
export default function CreateStore() {
    const router = useRouter();

    const { mutateAsync, isPending } = useCreateStore();

    const { feedback, setFeedback, clearFeedback } = useFeedback();

    const { state: currentStore, updateProps, resetProps } = useUpdateProps(INITIAL_STORE, {
        onReset: clearFeedback,
        onUpdate: clearFeedback,
    });

    const { hasChanges } = useChanges(currentStore, INITIAL_STORE);

    const createStore = async () => {
        const { id, createdAt, ...rest } = currentStore;
        
        const storeData = {
            ...rest,
            storeNumber: id,
        }

        try {
            await mutateAsync({ store: storeData });
            router.replace('/stores');
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
                { text: 'Add store', href: '/stores/create' },
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
                title="Store opening hours"
                className="mt-5 mb-2"
            />
            <Section>
                <StoreOpeningHours 
                    store={currentStore}
                    updateProps={updateProps}
                />
            </Section>
            <SectionHeader 
                title="Store contact information"
                className="mb-2 mt-5"
            />
            <Section>
                <StoreContactInformation 
                    store={currentStore}
                    updateProps={updateProps}
                />
            </Section>
            <SectionHeader 
                title="Store internal information"
                className="mb-2 mt-5"
            />
            <Section>
                <StoreInternalInformation 
                    storeNumber={currentStore.id}
                    updateProps={updateProps}
                    canEditStoreNumber
                />
            </Section>

            <HasChangesNotice 
                hasChanges={hasChanges}
                loading={isPending}
                onCancel={resetProps}
                onConfirm={createStore}
            />
        </main>
        </>
    )
}