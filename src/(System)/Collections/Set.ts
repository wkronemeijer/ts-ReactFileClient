import { panic } from "../Errors";
import { value_t } from "../Types/Primitive";

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

export function Set_hasAny<T extends value_t>(set: ReadonlySet<T>, value: unknown): value is T {
    return set.has(value as any);
}


export function Set_overlapsWith<T>(set: ReadonlySet<T>, iterable: Iterable<T>): boolean {
    for (const item of iterable) {
        if (set.has(item)) {
            return true;
        }
    }
    return false;
}

export function Set_isEmpty(set: ReadonlySet<unknown>): boolean {
       return set.size === 0;
}

export function Set_isNotEmpty(set: ReadonlySet<unknown>): boolean {
    return set.size !== 0;
}

/** 
 * Tries to remove one element from the start of the set. 
 * Returns undefined if the set is empty.
 */
export function Set_dequeue<T>(self: Set<T>): T | undefined {
    const first = self[Symbol.iterator]().next();
    if (!first.done) {
        const result = first.value;
        self.delete(result);
        return result;
    }
}
