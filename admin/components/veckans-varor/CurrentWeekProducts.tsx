import Image from "next/image";
import Section from "../section";
import SectionHeader from "../section-header";
import { WeeklyProductGroup } from "@/utils/types";
import { useModal } from "@/contexts/modal";
import WeeklyProductsModal from "@/modals/weekly-products";

export default function CurrentWeekProducts({ week }: {
    week: WeeklyProductGroup;
}) {
    const { setModal } = useModal();

    const openEditModal = () => setModal(<WeeklyProductsModal date={week.date} />);

    return(
        <>
            <SectionHeader 
                title="This week's products"
                buttonText="Edit products"
                onButtonClick={openEditModal}
                className="mb-2"
            />
            <Section className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2">
                {week.group.products.map(product => (
                    <Image 
                        alt=""
                        width={200}
                        height={200}
                        src={product.imageURL}
                        className="w-full"
                        key={product.id}
                    />
                ))}
            </Section>
        </>
    )
}