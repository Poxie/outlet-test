import getCurrentUser from "@/api/users/getCurrentUser";
import Sidebar from "@/components/sidebar";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();

    const getCurrentUserFn = async () => getCurrentUser({
        headers: {
            Cookie: cookies().toString(),
        }
    })

    const prefetchUser =  queryClient.prefetchQuery({
        queryKey: ['current-user'],
        queryFn: getCurrentUserFn,
    })
    const currentUser = getCurrentUserFn();

    try {
        const [_, user] = await Promise.all([prefetchUser, currentUser]);
    } catch(error) {
        redirect('/login');
        return null;
    }

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="min-h-screen flex items-start">
                <Sidebar />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </HydrationBoundary>
    );
}