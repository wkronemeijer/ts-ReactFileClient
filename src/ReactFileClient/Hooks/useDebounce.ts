import { useEffect, useState } from "react";

// From: https://usehooks-ts.com/react-hook/use-debounce
export function useDebounce<T>(value: T, delayMs = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    
    useEffect(() => {
        const timerId = setTimeout(() => setDebouncedValue(value), delayMs);
        return () => clearTimeout(timerId);
    }, [value, delayMs, setDebouncedValue]); // setDebouncedValue skipped because React guarantees stable identity
    
    return debouncedValue;
}
