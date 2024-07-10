import { Store } from "@/utils/types";
import StoresTableMenu from "./StoresTableMenu";
import { twMerge } from "tailwind-merge";

export default function StoresTableRow({ store }: {
    store: Store;
}) {
    const tdClassName = 'p-4';
    return(
        <tr>
            <td className={twMerge(
                'text-nowrap',
                tdClassName,
            )}>
                {store.name}
            </td>
            <td className={tdClassName}>
                {store.address}
            </td>
            <td className={tdClassName}>
                {store.email}
            </td>
            <td className={tdClassName}>
                {store.phoneNumber}
            </td>
            <td className={twMerge(
                tdClassName,
                'flex items-center justify-end',
            )}>
                <StoresTableMenu store={store} />
            </td>
        </tr>
    )
}