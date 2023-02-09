
/** noot noot */
export function mapmap<K, V, W>(
    map: ReadonlyMap<K, V>,
    func: (value: V, key: K) => W,
): Map<K, W> {
    const result = new Map<K, W>();
    for (const [k, v] of map) {
        result.set(k, func(v, k));
    }
    return result;
}

/** Converts a partial dictionary into a map. */
export function mapFromDictionary<K extends string | number | symbol, V>(
    dictionary: Partial<Record<K, V>>,
): Map<K, V | undefined> {
    const result = new Map<K, V | undefined>();
    for (const key in dictionary) {
        const value = dictionary[key];
        result.set(key, value);
    }
    return result;
}

/** Converts a tuple into a map, using the provided default value. */
export function mapFromTuple<Tuple extends readonly string[], Default>(
    tuple: Tuple,
    defaultValue: Default,
): Map<Tuple[number], Default> {
    const result = new Map<Tuple[number], Default>();
    for (const key of tuple) {
        result.set(key, defaultValue);
    }
    return result;
}
