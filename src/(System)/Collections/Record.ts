import { keyof_t } from "../Types/KeyOf";

export function Record_toFunction<K extends keyof_t, V>(
    self: Record<K, V>
): (x: K) => V {
    return x => self[x]
}
