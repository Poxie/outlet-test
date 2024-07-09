import { useEffect, useState } from "react";

export default function useUpdateProps<T>(initialState: T, options?: {
    onUpdate?: () => void;
    onReset?: () => void;
}) {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(initialState);
    }, [initialState]);

    function updateProps(changes: Partial<T>) {
        setState((prevState) => ({
            ...prevState,
            ...changes,
        }));
        options?.onUpdate?.();
    }
    function resetProps() {
        setState(initialState);
        options?.onReset?.();
    }

    return { state, updateProps, resetProps };
}