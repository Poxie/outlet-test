import { RefObject, useEffect } from "react";

export default function useClickOutside(
    ref: RefObject<HTMLElement>, 
    onClickOutside: () => void,
) {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if(ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);
}