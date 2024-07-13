import CloseIcon from "@/assets/icons/CloseIcon";
import { useModal } from "@/contexts/modal";
import { twMerge } from "tailwind-merge";

export default function ModalHeader({ title, description, className }: {
    title: string;
    description?: string;
    className?: string;
}) {
    const { closeModal } = useModal();

    return(
        <div className={twMerge(
            "p-4 grid gap-1 border-b-[1px] border-b-tertiary rounded-t-md",
            className,
        )}>
            <div className="flex items-center justify-between">
                <span className="text-xl font-semibold">
                    {title}
                </span>
                <button 
                    className="-m-1.5 p-1.5 hover:bg-tertiary active:bg-quaternary transition-colors rounded-md"
                    onClick={closeModal}
                    aria-label="Close modal"
                    autoFocus
                >
                    <CloseIcon size={24} />
                </button>
            </div>
            {description && (
                <span>
                    {description}
                </span>
            )}
        </div>
    )
}