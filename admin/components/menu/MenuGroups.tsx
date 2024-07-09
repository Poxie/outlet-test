import { MenuGroup } from ".";
import MenuItem from "./MenuItem";

export default function MenuGroups({ groups, setOpen }: {
    groups: MenuGroup[];
    setOpen: (open: boolean) => void;
}) {
    return(
        <ul className="min-w-menu p-1.5 absolute right-0 top-[calc(100%+.25rem)] divide-y-[1px] divide-tertiary border-[1px] border-tertiary bg-primary shadow rounded-md text-nowrap">
            {groups.map((items, key) => (
                <li 
                    className="py-1.5 first:pt-0 last:pb-0"
                    key={key}
                >
                    {items.map(item => (
                        <MenuItem 
                            item={item}
                            setOpen={setOpen}
                            key={item.text}
                        />
                    ))}
                </li>
            ))}
        </ul>
    )
}