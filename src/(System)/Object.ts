import { panic } from "./Errors";

/** Same as {@link Object.create}, but preserves type so you can use it for what prototypes were meant to do. */
export function Object_create<T extends object>(prototype: T, overwrite: Partial<T> = {}): T {
    return Object.assign(Object.create(prototype) as T, overwrite);
}

export function Object_explicitKeys<T extends object>(object: Record<keyof Required<T>, true>): (keyof T)[] {
    return Object.keys(object) as any;
}

// Based on https://humanwhocodes.com/blog/2021/04/lazy-loading-property-pattern-javascript/
/** Efficiently defines a lazy property on the given constructor. Property will be non-enumerable.
 * 
 * Example usage:
 * 
 *      class Foo { 
 *          leopard!: number;
 *          constructor(public readonly lion: number) {}
 *      }
 *      
 *      Object_defineLazyProperty(Foo, "leopard", function(){ 
 *          return this.lion ** 2;
 *      });
 */
export function Object_defineLazyProperty<
    C extends new(...args: any[]) => any,
    O extends InstanceType<C>,
    K extends keyof O,
>(
    constructor: C, 
    property: K,
    initializer: (this: O, property: K) => O[K],
): void {
    // Not enumerable, because prototype properties don't show up in object spreads anyway
    // Which would make it showing up after 1 access unintuitive. 
    Object.defineProperty(constructor.prototype, property, {
        get() {
            const value: O[K] = initializer.call(this, property);
            Object.defineProperty(this, property, { 
                value, 
            });
            return value;
        },
        configurable: true,
    });
}

interface Object_defineWriteOnceProperty_Options {
    /** Makes the property return undefined, instead of throwing an error on access before init. Note that you **must** mark the property with `| undefined`, otherwise your code will be unsound. */
    accessBeforeInit?: boolean;
}

// Decorators are still fucked as of this moment (Feb 2023)
/** Efficiently defines a write-once property on the given constructor. Property will be enumerable.
 * 
 * Example usage:
 * 
 *      class Foo { 
 *          leopard!: number;
 *      }
 *      
 *      Object_defineWriteOnceProperty(Foo, "leopard");
 */
export function Object_defineWriteOnceProperty<
    C extends new(...args: any[]) => any,
    O extends InstanceType<C>,
    K extends keyof O,
>(
    constructor: C, 
    property: K,
    options?: Object_defineWriteOnceProperty_Options,
): void {
    const accessBeforeInit = options?.accessBeforeInit ?? false;
    
    Object.defineProperty(constructor.prototype, property, {
        get() {
            if (!accessBeforeInit) {
                panic(`Access before initialization of '${constructor.name}.${String(property)}'.`);
            } else {
                return undefined;
            }
        },
        set(value) {
            Object.defineProperty(this, property, {
                value,
                enumerable: true,
            });
        },
        configurable: true,
    });
}
