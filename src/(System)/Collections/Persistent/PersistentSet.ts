import { Predicate } from "../Sequence";

export class PersistentSet<T> implements ReadonlySet<T> {
    readonly size: number;
    
    private constructor(private readonly store: ReadonlySet<T>) {
        this.size = this.store.size;
    }
    
    static readonly default = new PersistentSet<any>(new Set);
    
    // TODO: Pick 1 name and stick to it.
    static empty<T>(): PersistentSet<T> {
        return this.default;
    }
    
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
    
    toggle(element: T): PersistentSet<T> {
        if (this.has(element)) {
            return this.delete(element);
        } else {
            return this.add(element);
        }
    }
    
    clear(): PersistentSet<T> {
        if (this.size > 0) {
            return PersistentSet.default;
        } else return this;
    }
    
    /////////////////////////////
    // Methods Set should have //
    /////////////////////////////
    
    filter(predicate: Predicate<T>): PersistentSet<T> {
        const newStore = this.cloneStore();
        let change = false;
        for (const item of this) {
            if (predicate(item)) {
                newStore.add(item);
            } else {
                change = true;
            }
        }
        
        if (change) {
            return new PersistentSet(newStore);
        } else return this;
    }
    
    //////////////////////////
    // implements Equatable //
    //////////////////////////
    
    equals(other: PersistentSet<T>): boolean {
        for (const item of other) {
            if (!this.has(item)) {
                return false;
            }
        }
        return true;
    }
}
