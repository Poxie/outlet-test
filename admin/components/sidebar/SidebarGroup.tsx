import { useSidebar } from ".";
import SidebarGroupItem from "./SidebarGroupItem";
import { SidebarItem } from "./SidebarGroups";

export default function SidebarGroup({ title, items }: {
    title?: string;
    items: SidebarItem[];
}) {
    const { collapsed } = useSidebar();

    return(
        <div className="mb-6 first:-mt-2.5">
            {title && !collapsed && (
                <span className="text-sm text-muted font-semibold">
                    {title}
                </span>
            )}
            <ul>
                {items.map(item => (
                    <li key={item.path}>
                        <SidebarGroupItem 
                            item={item}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}