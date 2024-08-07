import Image from "next/image";
import { useSidebar } from "."
import HamIcon from "@/assets/icons/HamIcon";
import Link from "next/link";

export default function SidebarHeader() {
    const { collapsed, toggleCollapse } = useSidebar();

    return(
        <div className="h-sidebar-header p-5 flex items-center gap-3 border-b-[1px] border-b-tertiary">
            <button
                onClick={toggleCollapse}
                className="p-1 -m-1 hover:bg-secondary active:bg-tertiary transition-colors rounded-md"
                aria-label={collapsed ? "Open meny" : "Close meny"}
            >
                <HamIcon size={24} />
            </button>
            {!collapsed && (
                <Link
                    href="/"
                    aria-label="Go to dashboard"
                >
                    <Image 
                        src="/logo.png"
                        width={190}
                        height={31}
                        alt="Logo"
                        priority={true}
                    />
                </Link>
            )}
        </div>
    )
}