import fetchFromAPI from "@/api/fetchFromAPI";
import Sidebar from "@/components/sidebar";
import { cookies } from "next/headers";

export default async function MainLayout({ children }: {
    children: React.ReactNode;
}) {
    const user = await fetchFromAPI('/users/me', {
        headers: {
            Cookie: cookies().toString(),
        }
    })
    if(!user) return null;

    return(
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}