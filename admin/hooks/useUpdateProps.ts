import { useEffect, useState } from "react";

export default function useUpdateProps<T>(initialState: T, options?: {
    onUpdate?: () => void;
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
    }

    return { state, updateProps, resetProps };
}