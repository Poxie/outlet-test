import Image from "next/image";
import Section from "../section";
import SectionHeader from "../section-header";
import { WeeklyProductGroup } from "@/utils/types";

export default function CurrentWeekProducts({ week }: {
    week: WeeklyProductGroup;
}) {
    return(
        <>
            <SectionHeader 
                title="This week's products"
                buttonText="Edit products"
                buttonHref={`/veckans-varor/${week.date}`}
                className="mb-2"
            />
            <Section className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2">
                {week.products.map(product => (
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