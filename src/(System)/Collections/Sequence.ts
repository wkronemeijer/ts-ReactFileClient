import { Dictionary, Dictionary_create } from "./Dictionary";
import { deprecated, notImplemented } from "../Errors";
import { compare, compareAny } from "../Traits/Comparable/Compare";
import { Comparable } from "../Traits/Comparable/Comparable";
import { Comparer } from "../Traits/Comparable/Comparer";
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
 * Not directly callable. Try {@link Sequence.empty} or {@link Sequence.from} instead.
 */
export class Sequence<T> implements Iterable<T> {
    private constructor(private readonly source: Iterable<T>) {}
    
    [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }
    
    ////////////////////////
    // Creating sequences //
    ////////////////////////
    
    /** @bound */
    static empty<T>(): Sequence<T> {
        return Sequence.from([]);
    }
    
    /** @bound */
    static singleton<T>(element: T): Sequence<T> {
        return Sequence.from([element]);
    }
    
    /** 
     * Starts a iterable sequence. 
     * Made to look like LINQ. 
     * 
     * @bound
     */
    static from<T>(iter: Iterable<T>): Sequence<T> {
        return new Sequence(iter);
    }
    
    /** @bound */
    static of<T>(...elements: T[]): Sequence<T> {
        return Sequence.from(elements);
    }
    
    static range(end: number): Sequence<number>;
    static range(start: number, end: number): Sequence<number>;
    static range(startOrEnd: number, _end?: number|undefined): Sequence<number> {
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
        
        return new Sequence(function*(): Iterable<number> {
            for (let i = start; i < end ; i++) {
                yield i;
            }
        }());
    }
    
    /////////////////////////
    // Expanding sequences //
    /////////////////////////
    
    append(element: T): Sequence<T> {
        const self = this;
        return new Sequence(function*(): Iterable<T> {
            yield* self;
            yield element;
        }());
    }
    
    concat<U>(that: Iterable<U>): Sequence<T | U> {
        const self = this;
        return new Sequence(function*(): Iterable<T | U> {
            yield* self;
            yield* that;
        }());
    }
    
    zip<U>(other: Iterable<U>): Sequence<[T, U]> {
        const self = this;
        return new Sequence(function*(): Iterable<[T, U]> {
            const iterator1 = self[Symbol.iterator]();
            const iterator2 = other[Symbol.iterator]();
            
            let result1: IteratorResult<T>;
            let result2: IteratorResult<U>;
            
            while(true) {
                result1 = iterator1.next();
                result2 = iterator2.next();
                
                if (!result1.done && !result2.done) {
                    yield [result1.value, result2.value];
                } else {
                    return;
                }
            }
        }());
    }
    
    /////////////////////////////
    // Standard fold functions //
    /////////////////////////////
    
    select<U>(selector: Selector<T, U>): Sequence<U> {
        const self = this;
        return new Sequence(function*(): Iterable<U> {
            for (const item of self) {
                yield selector(item);
            }
        }());
    }
    
    selectMany<U>(selector: Selector<T, Iterable<U>>): Sequence<U> {
        const self = this;
        return new Sequence(function* () {
            for (const item of self) {
                yield* selector(item);
            }
        }());
    }
    
    where(filter: Predicate<T>): Sequence<T> {
        const self = this;
        return new Sequence(function*(): Iterable<T> {
            for (const item of self) {
                if (filter(item)) {
                    yield item;
                }
            }
        }());
    }
    
    /** **Warning** and TODO: only supports primitve equality (i.e. it uses `===`). */
    distinct(): Sequence<T> {
        const self = this;
        return new Sequence(function*(): Iterable<T> {
            const visitedSet = new Set<T>();
            for (const item of self) {
                if (!visitedSet.has(item)) {
                    yield item;
                    visitedSet.add(item);
                }
            }
        }());
    }
    /** @deprecated Use {@link distinct} instead. */
    unique(): Sequence<T> {
        deprecated();
    }
    
    reverse(): Sequence<T> {
        const self = this;
        return new Sequence(function*(): Iterable<T> {
            yield* self.toArray().reverse();
        }());
    }
    
    ///////////
    // Pairs // 
    ///////////
    
    associate<K, V>(
        keySelector: Selector<T, K>, 
        valueSelector: Selector<T, V>,
    ): Sequence<[K, V]> { 
        const self = this;
        return new Sequence(function*(): Iterable<[K, V]> {
            for (const item of self) {
                yield [keySelector(item), valueSelector(item)];
            }
        }());
    }
    
    // TODO: Make these return pairs, not maps
    associateBy<K>(
        keySelector: Selector<T, K>
    ): Sequence<[K, T]> {
        return this.associate(keySelector, identity);
    }
    
    associateWith<V>(
        valueSelector: Selector<T, V>
    ): Sequence<[T, V]> {
        return this.associate(identity, valueSelector);
    }
    
    ///////////
    // Sorts //
    ///////////
    
    orderBy(comparer: Comparer<T>): Sequence<T> {
        const self = this;
        return new Sequence(function*(): Iterable<T> {
            yield* self.toArray().sort(comparer);
        }());
    }
    
    orderOn<U extends Comparable>(
        selector: Selector<T, U>,
        comparer: Comparer<U> = compare,
    ): Sequence<T> {
        return this.orderBy((a, b) => comparer(selector(a), selector(b)));
    }
    
    ordered() {
        return this.orderBy(compareAny);
    }
    
    //////////////////////
    // Modify sequences //
    //////////////////////
    
    take(n: number): Sequence<T> {
        const self = this;
        return new Sequence(function*(): Iterable<T> {
            let i = 0;
            for (const item of self) {
                if (i++ < n) {
                    yield item;
                } else {
                    break;
                }
            }
        }());
    }
    
    skip(n: number): Sequence<T> {
        const self = this;
        return new Sequence(function*(): Iterable<T> {
            let i = 0;
            for (const item of self) {
                if (i++ < n) {
                    continue;
                } else {
                    yield item;
                }
            }
        }());
    }
    
    takeWhile(filter: Predicate<T>): Sequence<T> {
        const self = this;
        return new Sequence(function*(): Iterable<T> {
            notImplemented();
            // (Old one was a funny looking filter)
        }());
    }
    
    skipWhile(filter: Predicate<T>): Sequence<T> {
        const self = this;
        return new Sequence(function*(): Iterable<T> {
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
    // Making this pseudo """higher kinded type higher order function""" possible.
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
    
    toMapBy<K>(
        keySelector: Selector<T, K>, 
    ): Map<K, T> {
        return this.associateBy(keySelector).to(Map<K, T>);
    }
    
    toMapWith<V>(
        valueSelector: Selector<T, V>,
    ): Map<T, V> {
        return this.associateWith(valueSelector).to(Map<T, V>);
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
    
    toDictionaryBy(
        keySelector: Selector<T, string>, 
    ): Dictionary<T> {
        return this.toDictionary(keySelector, identity);
    }
    
    toString(joiner = ", "): string {
        return Array.from(this).join(joiner);
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
    
    /** The first element of the sequence. Terminal operation. */
    first(): T | undefined {
        const iterator = this[Symbol.iterator]();
        
        const result = iterator.next();
        if (!result.done) {
            return result.value;
        } else { // iterator was empty
            return undefined;
        }
    }
    
    /** The last element of the sequence. */
    last(): T | undefined {
        const iterator = this[Symbol.iterator]();
        
        let lastValue: T | undefined;
        while (true) {
            const result = iterator.next();
            if (!result.done) {
                lastValue = result.value;
            } else {
                break;
            }
        }
        return lastValue;
    }
}

/** Short hand for {@link Sequence.from}, made to look like LINQ. */
export const from = Sequence.from;
// ^ Don't change, it is used all over the place lol
