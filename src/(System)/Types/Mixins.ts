
// from https://mariusschulz.com/blog/mixin-classes-in-typescript
// Thanks, Marius!
/** Generic shape of constructor of T instances. */
export type Constructor<T = {}> = new (...args: any[]) => T;

// Mixins don't like extending null, so we add 1 layer of indirection.
/** A object type with no members. Useful for mixins. */
export class Null extends null { }
