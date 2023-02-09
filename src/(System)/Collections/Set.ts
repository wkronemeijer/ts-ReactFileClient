import { panic } from "../Errors";
import { primitive_t } from "../Types/Primitive";

////////////////
// Cached set //
////////////////

const setCache = new WeakMap<ReadonlyArray<any>, ReadonlySet<any>>();

/**
 * 
 * NB: Should only be called on immutable arrays.
 */
export function Set_getCachedSet<T>(array: readonly T[]): ReadonlySet<T> {
    if (!setCache.has(array)) {
        setCache.set(array, new Set(array));
    }
    return setCache.get(array) ?? panic();
}

//////////////////////
// Determiner (???) //
//////////////////////

// TODO: WTF does this do?
// Not used anywhere either (?!?!?!)
/** @deprecated Purpose unknown and not used. */
export function Set_createDeterminer<T, K extends string>(
    record: Record<K, Iterable<T>>,
): (x: T) => K | undefined {
    const map = new Map<T, K>();
    
    for (const [group, instances] of Object.entries<Iterable<T>>(record)) {
        for (const instance of instances) {
            if (map.has(instance)) {
                panic(`Duplicate detected: '${instance}'.`);
            }
            
            map.set(instance, group as K);
        }
    }
    
    return x => map.get(x);
}

// LooseHas

// TODO: Find a more technical term for 'loose'
// TODO: replace it with some subset of primitive

export function Set_hasAny<T extends primitive_t>(set: ReadonlySet<T>, value: unknown): value is T {
    return set.has(value as any);
}

