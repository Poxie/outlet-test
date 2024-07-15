import ProductsIcon from "@/assets/icons/ProductsIcon";
import SidebarGroup from "./SidebarGroup";
import DiscountIcon from "@/assets/icons/DiscountIcon";
import PeopleIcon from "@/assets/icons/PeopleIcon";
import StoresIcon from "@/assets/icons/StoresIcon";
import { useSidebar } from ".";
import { twMerge } from "tailwind-merge";
import AnalyticsIcon from "@/assets/icons/AnalyticsIcon";

const ICON_SIZE = 24;
const GROUPS = [
    {
        items: [
            { text: 'Analytics', path: '/', icon: <AnalyticsIcon size={ICON_SIZE} /> },
        ]
    },
    {
        title: 'Products',
        items: [
            { text: 'Veckans varor', path: '/veckans-varor', icon: <DiscountIcon size={ICON_SIZE} /> },
            { text: 'Products', path: '/produkter', icon: <ProductsIcon size={ICON_SIZE} /> },
        ]
    },
    {
        title: 'Admin',
        items: [
            { text: 'People', path: '/people', icon: <PeopleIcon size={ICON_SIZE} /> },
            { text: 'Stores', path: '/stores', icon: <StoresIcon size={ICON_SIZE} /> },
        ]
    }
]

export type SidebarGroup = typeof GROUPS[number];
export type SidebarItem = typeof GROUPS[number]['items'][number];

export default function SidebarGroups() {
    const { collapsed } = useSidebar();

    return(
        <nav className={twMerge(
            collapsed && "divide-y-[1px] divide-tertiary"
        )}>
            {GROUPS.map((group, key) => (
                <SidebarGroup 
                    title={group.title}
                    items={group.items}
                    key={key}
                />
            ))}
        </nav>
    )
}