///////////
// keyof //
///////////
/** A union of all possible `keyof` types. */
export type keyof_t = keyof any;
/** Returns all possible keys, not all guaranteed keys. See it as "maximum" keyof for type unions. */

export type DistributeKeyof<T> = T extends any ? keyof T : never;
