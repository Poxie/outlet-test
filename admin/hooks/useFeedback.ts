import { useState } from "react";

export type FeedbackProps = {
    message: string;
    type: 'danger' | 'success';
}
export default function useFeedback() {
    const [feedback, setFeedback] = useState<null | FeedbackProps>(null);

    const clearFeedback = () => setFeedback(null);

    return { feedback, setFeedback, clearFeedback };
}