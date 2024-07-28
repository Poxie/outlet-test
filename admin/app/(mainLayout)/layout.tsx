"use client";
import Sidebar from "@/components/sidebar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const { data, isPending } = useCurrentUser();

    if(!data && !isPending) {
        router.replace('/login');
        return null;
    }
    if(!data) return null;

    return(
        <div className="min-h-screen flex items-start animate-loading-opacity-in">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}