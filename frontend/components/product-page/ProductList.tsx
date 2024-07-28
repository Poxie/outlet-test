import { ProductGroup as ProductGroupType } from "@/utils/types";
import ProductHeader from "./ProductHeader";
import ProductGrid from "./ProductGrid";
import PageBanner, { BannerStep } from "../page-banner";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ProductList({ groups, className, header: { title, path } }: {
    header: {
        title: string;
        path: string;
    }
    groups: ProductGroupType[];
    className?: string;
}) {
    const activeGroupId = useSearchParams().get('products');

    useEffect(() => {
        if(!activeGroupId) return window.scrollTo({ top: 0 });

        const activeGroup = document.getElementById(activeGroupId);
        if(activeGroup) {
            activeGroup.scrollIntoView();
        }
    }, [activeGroupId]);

    return(
        <div className={className}>
            {groups.map(({ id, name, description, bannerURL, products, parentId }) => {
                const steps: BannerStep[] = [
                    { text: 'Start', path: '/' },
                    { text: title, path, replace: true },
                ]
                if(parentId) {
                    steps.push({ text: name, path: `/${parentId}?products=${id}`, replace: true });
                }
    
                return(
                    <div 
                        id={id}
                        className="pb-12 mb-8 last:border-none border-b-[1px] border-b-tertiary scroll-mt-navbar"
                        key={id}
                    >
                        <PageBanner 
                            steps={steps}
                        />
                        <>
                            <ProductHeader 
                                title={name}
                                description={description}
                                image={bannerURL}
                            />
                            <ProductGrid products={products} />
                        </>
                    </div>
                )
            })}
        </div>
    )
}