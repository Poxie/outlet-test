import CloseIcon from "@/assets/icons/CloseIcon";
import { useModal } from "@/contexts/modal";

export default function ModalHeader({ title, description }: {
    title: string;
    description: string;
}) {
    const { closeModal } = useModal();

    return(
        <div className="p-4 grid gap-1">
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
            <span>
                {description}
            </span>
        </div>
    )
}