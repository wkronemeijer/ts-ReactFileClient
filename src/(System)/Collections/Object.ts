import { createDictionary } from "./Dictionary";


export function createStringEnum<Ks extends readonly string[]>(keys: Ks): {
    [P in Ks[number]]: P;
} {
    const object = createDictionary();
    for (const key of keys) object[key] = key;
    return object as any;
}


/** Merges a single object, creating a copy. */
export function mergeObject<T1 extends {}                                             >(object_1: T1                                        ): T1;
/** Merges two object to create one new object. */
export function mergeObject<T1 extends {}, T2 extends {}                              >(object_1: T1, object_2: T2                          ): T1 & T2;
/** Merges three object to create one new object. */
export function mergeObject<T1 extends {}, T2 extends {}, T3 extends {}               >(object_1: T1, object_2: T2, object_3: T3            ): T1 & T2 & T3;
/** Merges four object to create one new object. */
export function mergeObject<T1 extends {}, T2 extends {}, T3 extends {}, T4 extends {}>(object_1: T1, object_2: T2, object_3: T3, object: T4): T1 & T2 & T3 & T4;
/** Implementation. */
export function mergeObject(...objects: object[]): object {
    return Object.assign({}, ...objects);
}
