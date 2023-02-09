// Limited interface for array, so you don't forget which combination is the best.

/** Interface limitation to force LIFO usage. */
export interface Stack<T> extends ReadonlyArray<T> {
    /** The total depth of the stack. */
    length: number;
    /** Adds a new element on top of the stack. */
    push(element: T): void;
    /** Pops an element from the top of stack, returning it. */
    pop(): T | undefined;
}

// NB: Uncomment to check if it works.
// var s: Stack<number> = [1,2,3,4];
