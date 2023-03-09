import { useEffect, useState } from "react";


/** 
 * Will be set to true the given number of milliseconds after the component is mounted. 
 */
export function useDelay(ms: number): boolean {
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        const timerId = setTimeout(() => setReady(true), ms);
        return () => clearTimeout(timerId);
    }, []);
    // Technically depends on `ms`, 
    // but we only want the component to trigger once.
    // subsequent triggers aren't observable either:
    // ready will remain true.
    
    return ready;
}
