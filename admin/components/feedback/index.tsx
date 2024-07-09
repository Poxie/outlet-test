import { twMerge } from "tailwind-merge";

export type FeedbackProps = {
    type: 'danger' | 'success';
    message: string;
}

export default function Feedback({ type, message, className }: FeedbackProps & {
    className?: string;
}) {
    return(
        <span
            className={twMerge(
                "p-4 block border-[1px] rounded-md",
                type === 'danger' && ' bg-danger/20 border-danger',
                type === 'success' && 'bg-success/20 border-success',
                className,
            )}
        >
            {message}
        </span>
    )
}