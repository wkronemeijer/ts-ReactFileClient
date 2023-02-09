
import { Array_firstElement, Array_lastElement } from "./Array";
import { Comparable, compare, Comparer } from "../Traits/Comparable";
import { Dictionary, Dictionary_create } from "./Dictionary";
import { deprecated, notImplemented } from "../Errors";
import { identity } from "../Function";

export interface Selector<T, U> {
    (x: T): U;
}

export interface Predicate<T> {
    (x: T): unknown;
}

/** 
 * Immutable wrapper around an iterable. Made to match the C#'s API. 
 * 
 * Not directly callable. Try {@link Linq.empty} or {@link Linq.from} instead.
 */
export class Linq<T> implements Iterable<T> {
    private constructor(private readonly source: Iterable<T>) {}
    
    [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }
    
    ////////////////////////
    // Creating sequences //
    ////////////////////////
    
    static empty<T>(): Linq<T> {
        return this.from([]);
    }
    
    static singleton<T>(element: T): Linq<T> {
        return this.from([element]);
    }
    
    /** Starts a iterable sequence. Made to look like LINQ. */
    static from<T>(iter: Iterable<T>): Linq<T> {
        return new Linq(iter);
    }
    
    static range(end: number): Linq<number>;
    static range(start: number, end: number): Linq<number>;
    static range(startOrEnd: number, _end?: number|undefined): Linq<number> {
        ////////////////////
        // Sort overloads //
        ////////////////////
        
        let start: number;
        let end  : number;
        
        if (_end !== undefined) {
            start = startOrEnd;
            end   = _end;
        } else {
            start = 0;
            end = startOrEnd;
        }
        
        ////////////////////
        // Implementation //
        ////////////////////
        
        return new Linq(function*(): Iterable<number> {
            for (let i = start; i < end ; i++) {
                yield i;
            }
        }());
    }
    
    /////////////////////////
    // Expanding sequences //
    /////////////////////////
    
    append(element: T): Linq<T> {
        const self = this;
        return new Linq(function*(): Iterable<T> {
            yield* self;
            yield element;
        }());
    }
    
    concat<U>(that: Iterable<U>): Linq<T | U> {
        const self = this;
        return new Linq(function*(): Iterable<T | U> {
            yield* self;
            yield* that;
        }());
    }
    
    append_nonNull(element: T | undefined): Linq<T> {
        if (element !== undefined) {
            return this.append(element);
        } else {
            return this;
        }
    }
    
    concat_nonNull<U>(elements: Iterable<U> | undefined): Linq<T | U> {
        if (elements !== undefined) {
            return this.concat(elements);
        } else {
            return this;
        }
    }
    
    zip<U>(other: Iterable<U>): Linq<readonly [T, U]> {
        const self = this;
        return new Linq(function*(): Iterable<readonly [T, U]> {
            const iterator1 = self[Symbol.iterator]();
            const iterator2 = other[Symbol.iterator]();
            
            let result1: IteratorResult<T>;
            let result2: IteratorResult<U>;
            
            while(true) {
                result1 = iterator1.next();
                result2 = iterator2.next();
                
                if (result1.done || result2.done) {
                    return;
                } else {
                    yield [result1.value, result2.value];
                }
            }
        }());
    }
    
    /////////////////////////////
    // Standard fold functions //
    /////////////////////////////
    
    select<U>(selector: Selector<T, U>): Linq<U> {
        const self = this;
        return new Linq(function*(): Iterable<U> {
            for (const item of self) {
                yield selector(item);
            }
        }());
    }
    
    selectMany<U>(selector: Selector<T, Iterable<U>>): Linq<U> {
        const self = this;
        return new Linq(function* () {
            for (const item of self) {
                yield* selector(item);
            }
        }());
    }
    
    where(filter: Predicate<T>): Linq<T> {
        const self = this;
        return new Linq(function*(): Iterable<T> {
            for (const item of self) {
                if (filter(item)) {
                    yield item;
                }
            }
        }());
    }
    
    /** Warning and TODO: only supports primitve equality. */
    distinct(): Linq<T> {
        const visitedSet = new Set<T>();
        const self = this;
        return new Linq(function*(): Iterable<T> {
            for (const item of self) {
                if (!visitedSet.has(item)) {
                    yield item;
                    visitedSet.add(item);
                }
            }
        }());
    }
    /** @deprecated Use {@link distinct} instead. */
    unique(): Linq<T> {
        deprecated();
    }
    
    reverse(): Linq<T> {
        const self = this;
        return new Linq(function*(): Iterable<T> {
            yield* self.toArray().reverse();
        }());
    }
    
    ///////////
    // Pairs // 
    ///////////
    
    associate<K, V>(
        keySelector: Selector<T, K>, 
        valueSelector: Selector<T, V>,
    ): Linq<readonly [K, V]> { 
        const self = this;
        return new Linq(function*(): Iterable<[K, V]> {
            for (const item of self) {
                yield [keySelector(item), valueSelector(item)];
            }
        }());
    }
    
    // TODO: Make these return pairs, not maps
    associateBy<K>(
        keySelector: Selector<T, K>
    ): Linq<readonly [K, T]> {
        return this.associate(keySelector, identity);
    }
    
    associateWith<V>(
        valueSelector: Selector<T, V>
    ): Linq<readonly [T, V]> {
        return this.associate(identity, valueSelector);
    }
    
    
    ///////////
    // Sorts //
    ///////////
    
    orderBy(comparator: Comparer<T>): Linq<T> {
        const self = this;
        return new Linq(function*(): Iterable<T> {
            yield* self.toArray().sort(comparator);
        }());
    }
    
    orderOn<U extends Comparable>(selector: Selector<T, U>): Linq<T> {
        return this.orderBy((a, b) => compare(selector(a), selector(b)));
    }
    
    //////////////////////
    // Modify sequences //
    //////////////////////
    
    take(n: number): Linq<T> {
        const self = this;
        return new Linq(function*(): Iterable<T> {
            let i = 0;
            for (const item of self) {
                if (i < n) {
                    yield item;
                } else {
                    break;
                }
                i++;
            }
        }());
    }
    
    skip(n: number): Linq<T> {
        const self = this;
        return new Linq(function*(): Iterable<T> {
            let i = 0;
            for (const item of self) {
                if (i >= n) {
                    yield item;
                }
                i++;
            }
        }());
    }
    
    takeWhile(filter: Predicate<T>): Linq<T> {
        const self = this;
        return new Linq(function*(): Iterable<T> {
            for (const item of self) {
                if (filter(item)) {
                    yield item;
                } else {
                    break;
                }
            }
        }());
    }
    
    skipWhile(filter: Predicate<T>): Linq<T> {
        const self = this;
        return new Linq(function*(): Iterable<T> {
            notImplemented();
        }());
    }
    
    /////////////////////////
    // To-other-collection //
    /////////////////////////
    
    toArray(): T[] { 
        return Array.from(this); 
    }
    
    
    // Thanks to TS 4.X you can provide type hints without actually invoking a function. 
    // Making this pseudo-higher kinded type possible.
    to<C extends new (iterable: Iterable<T>) => any>(constructor: C): InstanceType<C> {
        return new constructor(this);
    }
        
    toSet(): Set<T> {
        return this.to(Set<T>); 
    }
    
    toMap<K, V>(
        keySelector: Selector<T, K>, 
        valueSelector: Selector<T, V>,
    ): Map<K, V> {
        return this.associate(keySelector, valueSelector).to(Map<K, V>);
    }
    
    toDictionary<V>(
        keySelector: Selector<T, string>, 
        valueSelector: Selector<T, V>,
    ): Dictionary<V> {
        const dict = Dictionary_create<V>();
        for (const element of this) {
            dict[keySelector(element)] = valueSelector(element);
        }
        return dict;
    }
    
    // Generic to(Collection) is not possible, because HKTs aren't a thing.
    
    ////////////////////////////
    // Other "finish" methods //
    ////////////////////////////
    
    /** The size of the selected sequence. */
    count(): number {
        let count = 0;
        for (const _ of this) {
            count++;
        }
        return count;
    }
    
    /** The maximum of the selected sequence. */
    max(selector: Selector<T, number>): number {
        return Math.max(...this.select(selector));
    }
    
    /** The minimum of the selected sequence. */
    min(selector: Selector<T, number>): number {
        return Math.min(...this.select(selector));
    }
    
    /** The first element of the sequence. */
    first(): T | undefined {
        // TODO: Do smelly iterator logic
        // Technically both of these can be a lot more efficient
        // But muh effort and muh correctness
        const list = Array.from(this);
        return Array_firstElement(list);
    }
    
    /** The last element of the sequence. */
    last(): T | undefined {
        const list = Array.from(this);
        return Array_lastElement(list);
    }
}

/** Short hand for {@link Linq.from}, made to look like LINQ. */
export const from = Linq.from;
// ^ Mind that `Linq.from` does not use this in any form, and so is safe to bind like this.
