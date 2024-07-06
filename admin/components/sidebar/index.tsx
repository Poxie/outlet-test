import Image from "next/image";
import SidebarGroups from "./SidebarGroups";

export default function Sidebar() {
    return(
        <div className="w-sidebar bg-primary border-r-[1px] border-r-tertiary">
            <div className="h-sidebar-header p-5 border-b-[1px] border-b-tertiary">
                <Image 
                    src="/logo.png"
                    width={210}
                    height={31}
                    alt="Logo"
                />
            </div>
            <div className="p-5">
                <SidebarGroups />
            </div>
        </div>
    )
}