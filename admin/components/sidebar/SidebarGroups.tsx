import ProductsIcon from "@/assets/icons/ProductsIcon";
import SidebarGroup from "./SidebarGroup";
import DiscountIcon from "@/assets/icons/DiscountIcon";
import PeopleIcon from "@/assets/icons/PeopleIcon";
import StoresIcon from "@/assets/icons/StoresIcon";

const ICON_SIZE = 20;
const GROUPS = [
    {
        items: [
            { text: 'Veckans varor', path: '/veckans-varor', icon: <DiscountIcon size={ICON_SIZE} /> },
            { text: 'Products', path: '/products', icon: <ProductsIcon size={ICON_SIZE} /> },
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
    return(
        <nav>
            {GROUPS.map(group => (
                <SidebarGroup 
                    title={group.title}
                    items={group.items}
                    key={group.title}
                />
            ))}
        </nav>
    )
}