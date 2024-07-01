import WarningIcon from "@/icons/WarningIcon";

export default function SicklaNotice() {
    const sicklaPhoneNumber = "073-052 93 74";
    return(
        <div className="py-6 border-y-[1px] border-y-tertiary">
            <div className="main-width flex gap-4 sm:gap-2">
                <WarningIcon className="mt-0.5 sm:mt-0 min-w-6" size={24} />
                <div className="flex-1 flex flex-col sm:flex-row gap-2">
                    <span>
                        Notera att utbudet hos Sickla kan variera. Undrar du om Sickla har en produkt, ring först. 
                    </span>
                    <span className="sm:ml-auto whitespace-nowrap">
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
        </div>
    )
}