// Limited interface for array, so you don't forget which combination is the best.

/** Interface limitation to force FIFO usage. */
export interface Queue<T> extends ReadonlyArray<T> {
    /** Add a new element to the queue. */
    push(element: T): void;
    /** Removes the first element from the queue and returns it. */    
    shift(): T | undefined;
}

// NB: Uncomment to check if it works.
// var q: Queue<number> = [1,2,3,4];
