"use client";
import getCurrentUser from "@/api/users/getCurrentUser";
import Sidebar from "@/components/sidebar";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const { data, isPending } = useQuery({
        queryKey: ['current-user'],
        queryFn: getCurrentUser,
    })

    if(!data && !isPending) {
        router.replace('/login');
        return null;
    }
    if(!data) return null;

    return(
        <div className="min-h-screen flex items-start">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}