import BinIcon from "@/assets/icons/BinIcon";

export default function RemoveItemButton({ onClick, ariaLabel }: {
    onClick: () => void;
    ariaLabel: string;
}) {
    return (
        <button
            onClick={onClick}
            className="p-2 absolute top-2 right-2 text-c-primary bg-primary hover:bg-c-primary hover:text-light transition-colors rounded-md shadow-lg"
            aria-label={ariaLabel}
            type="button"
        >
            <BinIcon size={20} />
        </button>
    )
}