/** The identity function. */
export const identity = <T>(x: T) => x;

/** The constant function. */
export const constant = <T>(x: T) => <U>(y: U) => x;

/** Constant &top; function. */
export const alwaysTrue = constant(true);

/** Constant &bot; function. */
export const alwaysFalse = constant(false);

/** Selects the first element of a tuple. */
export const fst = <T>(array: readonly [T, ...any[]]): T => array[0];
/** Selects the second element of a tuple. */
export const snd = <T>(array: readonly [unknown, T, ...any[]]): T => array[1];

/*
Note on name:

($)               : (a -> b) -> a -> b
(&) = reverse ($) : a -> (a -> b) -> b

We have curried (&) here, how to call it?


*/
/** Applies a function in reverse. `reverse "apply"` if you will. */
export function ylppa<
    F extends (...args: any[]) => any
>(...args: Parameters<F>): (func: F) => ReturnType<F> {
    return func => func(...args);
}

export function createFactory<F extends new (...args: any[]) => any>(
    constructor: F
): (...args: ConstructorParameters<F>) => InstanceType<F> {
    return (...args) => new constructor(...args);
}

/** **WARNING**: the prototype of both arguments will be overriden! Make sure to provide fresh/local arguments. */
export function Function_includeProperties<F extends Function, O extends object>(func: F, prototype: O): F & O {
    const originalPrototype = Object.getPrototypeOf(func);
    Object.setPrototypeOf(prototype, originalPrototype);
    Object.setPrototypeOf(func, prototype);
    return func as F & O;
}
