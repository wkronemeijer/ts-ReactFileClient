export class PersistentMap<K, V> implements ReadonlyMap<K, V> {
    readonly size: number;
    
    private constructor(private readonly store: ReadonlyMap<K, V>) {
        this.size = this.store.size;
    }
    
    // TODO: Pick 1 name and stick to it.
    static readonly EmptyMap = new PersistentMap<any, any>(new Map);
    static readonly Empty    = this.EmptyMap
    static readonly default  = this.EmptyMap;
    
    private cloneStore(): Map<K, V> {
        return new Map(this.store);
    }
    
    /////////////////////////
    // ReadonlyMap methods //
    /////////////////////////
    
    get(key: K): V | undefined {
        return this.store.get(key);
    }
    
    has(key: K): boolean {
        return this.store.has(key);
    }
    
    entries(): IterableIterator<[K, V]> { return this.store.entries() }
    keys()   : IterableIterator<K>      { return this.store.keys()    }
    values() : IterableIterator<V>      { return this.store.values()  }
    
    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.store[Symbol.iterator]();
    }
        
    // this is very ugly, lol wat?
    forEach(callbackfn: (value: V, key: K, Map: ReadonlyMap<K, V>) => void, thisArg?: any): void {
        return this.store.forEach(callbackfn, thisArg);
    }
    
    /////////////////
    // Map methods //
    /////////////////
    
    set(key: K, value: V): PersistentMap<K, V> {
        if (!this.has(key)) {
            const newStore = this.cloneStore();
            newStore.set(key, value);
            return new PersistentMap(newStore);
        } else return this;
    }
    
    delete(key: K): PersistentMap<K, V> {
        if (this.has(key)) {
            const newStore = this.cloneStore();
            newStore.delete(key);
            return new PersistentMap(newStore);
        } else return this;
    }
    
    clear(): PersistentMap<K, V> {
        if (this.size > 0) {
            return PersistentMap.default;
        } else return this;
    }
}
