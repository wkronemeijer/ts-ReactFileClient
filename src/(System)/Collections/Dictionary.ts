

/** An object-based hash map. */
export interface Dictionary<T> {
    [key: string]: T | undefined;
}

/** Creates an object-based hash map. */
export function createDictionary<T = unknown>(): Dictionary<T> {
    const dict = Object.create(null) as Dictionary<T>;
    
    // trick lifted from the tsc codebase:
    (dict.foo as any) = null;
    delete dict.foo;
    // forces V8 to use a hash map
    
    return dict;
}

/** Transform an object-based hash map into a real map. */
export function flattenDictionary<T>(dict: Dictionary<T>): Map<string, T> {
    const map = new Map<string, T>();
    for (const key in dict) {
        map.set(key, dict[key]!);
    } 
    return map;
}

export function Dictionary_hasInstance(x: unknown): x is Dictionary<unknown> {
    return (typeof x === "object") && x !== null;
}
