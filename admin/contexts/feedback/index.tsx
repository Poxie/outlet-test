import React, { useRef, useState } from "react";
import Feedback from "./Feedback";
import { AnimatePresence } from "framer-motion";

export type FeedbackProps = {
    type: 'success' | 'danger';
    message: string;
}

const FeedbackContext = React.createContext<null | {
    setFeedback: (feedback: FeedbackProps) => void;
    closeFeedback: () => void;
}>(null);

export const useFeedback = () => {
    const context = React.useContext(FeedbackContext);
    if(!context) {
        throw new Error('useFeedback must be used within a FeedbackProvider');
    }
    return context;
}

export const FEEDBACK_DURATION = 5000;

export default function FeedbackProvider({ children }: {
    children: React.ReactNode;
}) {
    const [feedback, setFeedback] = useState<null | {
        id: number;
        feedback: FeedbackProps;
    }>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = () => {
        if(timeout.current) clearTimeout(timeout.current);
    }

    const handleSetFeedback = (feedback: FeedbackProps) => {
        setFeedback({
            id: Date.now(),
            feedback,
        });

        resetTimeout();
        timeout.current = setTimeout(closeFeedback, FEEDBACK_DURATION);
    }

    const closeFeedback = () => {
        setFeedback(null);
        resetTimeout();
    }

    const value = {
        setFeedback: handleSetFeedback,
        closeFeedback,
    };
    return(
        <FeedbackContext.Provider value={value}>
            {children}

            <AnimatePresence mode="wait">
                {feedback && (
                    <Feedback 
                        {...feedback.feedback}
                        key={feedback.id}
                    />
                )}
            </AnimatePresence>
        </FeedbackContext.Provider>
    )
}