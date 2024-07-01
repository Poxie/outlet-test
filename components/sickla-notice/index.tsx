import WarningIcon from "@/icons/WarningIcon";

export default function SicklaNotice() {
    const sicklaPhoneNumber = "073-052 93 74";
    return(
        <div className="py-6 border-y-[1px] border-y-tertiary">
            <div className="main-width flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <WarningIcon size={24} />
                    <span>
                        Notera att utbudet hos Sickla kan variera. Undrar du om Sickla har en produkt, ring först. 
                    </span>
                </div>
                <span>
                    Tel:
                    {' '}
                    <a 
                        href={`tel:${sicklaPhoneNumber}`}
                        className="border-b-[1px] border-b-transparent hover:border-b-current transition-colors"
                    >
                        {sicklaPhoneNumber}
                    </a>
                </span>
            </div>
        </div>
    )
}