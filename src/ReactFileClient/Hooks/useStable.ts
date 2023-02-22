import { useMemo } from "react";

import { Dictionary } from "../../(System)/Collections/Dictionary";

export function useStable<T extends Dictionary<unknown>>(object: T): Readonly<T> {
    // Object.values has a stable iteration order
    const dependencies = Object.values(object);
    const stableObject = useMemo(() => object, dependencies);
    
    return stableObject;
}
