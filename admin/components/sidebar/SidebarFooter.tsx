import useCurrentUser from "@/hooks/useCurrentUser"
import Link from "next/link";
import { useSidebar } from ".";

export default function SidebarFooter() {
    const { collapsed } = useSidebar();

    const { data: user } = useCurrentUser();

    if(!user) return null;

    const signOut = () => {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/login';
    }

    const initials = user.name.split(' ').map(name => name[0]).join('');
    return(
        <div className="p-4 flex justify-between items-center border-t-[1px] border-t-tertiary">
            <Link 
                className="-m-2 p-2 pr-3 flex items-center gap-2 rounded-md hover:bg-secondary active:bg-tertiary transition-colors" 
                href={`/people/${user.id}`}
            >
                <span className="w-8 aspect-square flex items-center justify-center uppercase rounded-full text-xs font-semibold bg-secondary border-[1px] border-quaternary">
                    {initials}
                </span>
                {!collapsed && (
                    <span className="text-sm">
                        {user.name}
                    </span>
                )}
            </Link>
            {!collapsed && (
                <button 
                    className="text-xs text-danger hover:underline"
                    onClick={signOut}
                >
                    Sign out
                </button>
            )}
        </div>
    )
}