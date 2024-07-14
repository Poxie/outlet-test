import { motion } from 'framer-motion';
import { FEEDBACK_DURATION, FeedbackProps, useFeedback } from ".";
import { twMerge } from 'tailwind-merge';
import WarningIcon from '@/assets/icons/WarningIcon';
import CloseIcon from '@/assets/icons/CloseIcon';
import CheckIcon from '@/assets/icons/CheckIcon';

const HIDDEN = {
    top: -50,
}
const VISIBLE = {
    top: 16,
}
export default function Feedback({ type, message }: FeedbackProps) {
    const { closeFeedback } = useFeedback();

    return(
        <motion.div
            initial={HIDDEN}
            animate={VISIBLE}
            exit={HIDDEN}
            transition={{ bounce: false, duration: .2 }}
            className={twMerge(
                "sm:min-w-modal max-w-main p-4 flex items-center justify-between gap-4 z-50 fixed left-2/4 -translate-x-2/4 text-light font-semibold rounded-md overflow-hidden",
                type === 'danger' && ' bg-danger',
                type === 'success' && 'bg-success',
            )}
        >
            <div className="flex items-center gap-3">
                {type === 'danger' && (
                    <WarningIcon size={24} />
                )}
                {type === 'success' && (
                    <CheckIcon size={24} />
                )}
                {message}
            </div>

            <button
                onClick={closeFeedback}
                aria-label="Close feedback"
            >
                <CloseIcon size={20} />
            </button>

            <div 
                className="absolute bottom-0 left-0 w-full h-[4px] bg-primary animate-feedback-progress"
                style={{ 
                    animationDuration: `${FEEDBACK_DURATION}ms`,
                    animationFillMode: 'forwards',
                }}
            />
        </motion.div>
    )
}