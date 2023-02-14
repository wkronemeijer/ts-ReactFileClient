
export class PersistentSet<T> implements ReadonlySet<T> {
    readonly size: number;
    
    private constructor(private readonly store: ReadonlySet<T>) {
        this.size = this.store.size;
    }
    
    // TODO: Pick 1 name and stick to it.
    static readonly EmptySet = new PersistentSet<any>(new Set);
    static readonly Empty    = this.EmptySet
    static readonly default  = this.EmptySet;
    
    static from<T>(iterable: Iterable<T>): PersistentSet<T> {
        return new PersistentSet(new Set(iterable));
    }
    
    static of<T>(...elements: readonly T[]) {
        return this.from(elements);
    }
    
    private cloneStore(): Set<T> {
        return new Set(this.store);
    }
    
    /////////////////////////
    // ReadonlySet methods //
    /////////////////////////
    
    has(element: T): boolean {
        return this.store.has(element);
    }
    
    entries(): IterableIterator<[T, T]> { return this.store.entries() }
    keys()   : IterableIterator<T>      { return this.store.keys()    }
    values() : IterableIterator<T>      { return this.store.values()  }
    
    [Symbol.iterator](): IterableIterator<T> {
        return this.store[Symbol.iterator]();
    }
        
    // this is very ugly, lol wat?
    forEach(callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: any): void {
        return this.store.forEach(callbackfn, thisArg);
    }
        
    /////////////////
    // Set methods //
    /////////////////
    
    add(element: T): PersistentSet<T> {
        if (!this.has(element)) {
            const newStore = this.cloneStore();
            newStore.add(element);
            return new PersistentSet(newStore);
        } else return this;
    }
    
    delete(element: T): PersistentSet<T> {
        if (this.has(element)) {
            const newStore = this.cloneStore();
            newStore.delete(element);
            return new PersistentSet(newStore);
        } else return this;
    }
    
    clear(): PersistentSet<T> {
        if (this.size > 0) {
            return PersistentSet.default;
        } else return this;
    }
    
    /////////////////////////////
    // Methods Set should have //
    /////////////////////////////
    
    union<U>(other: Iterable<U>): PersistentSet<T | U> {
        const newStore: Set<T | U> = this.cloneStore();
        for (const item of other) {
            newStore.add(item);
        }
        return new PersistentSet(newStore);
    }
    
    intersect(other: Iterable<T>): PersistentSet<T> {
        const newStore = new Set<T>;
        for (const item of other) {
            if (this.has(item)) {
                newStore.add(item);
            }
        }
        return new PersistentSet(newStore);
    }
    
    /** Set difference */
    except(other: Iterable<T>): PersistentSet<T> {
        const newStore = this.cloneStore();
        for (const item of other) {
            newStore.delete(item);
        }
        return new PersistentSet(newStore);
    }
    
    ///////////////////////
    // Additional checks //
    ///////////////////////
    
    equals(other: PersistentSet<T>): boolean {
        for (const item of other) {
            if (!this.has(item)) {
                return false;
            }
        }
        return true;
    }
    
    overlapsWith(other: Iterable<T>): boolean {
        for (const item of other) {
            if (this.has(item)) {
                return true;
            }
        }
        return false;
    }
    
    isSubsetOf(otherSet: ReadonlySet<T>): boolean {
        for (const item of this) {
            if (!otherSet.has(item)) {
                return false;
            }
        }
        return true;
    }
    
    isSupersetOf(otherSet: ReadonlySet<T>): boolean {
        for (const item of otherSet) {
            if (!this.has(item)) {
                return false;
            }
        }
        return true;
    }
}
