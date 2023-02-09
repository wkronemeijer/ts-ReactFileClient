// NB: Boolean("") == false
// Remember that!

import { Array_firstElement, Array_IndexNotFound, Array_lastElement } from "../Collections/Array";
import { equals as System_equals, EqualityComparer } from "../Traits/Equatable";
import { compare as System_compare, Comparer } from "../Traits/Comparable";
import { ensures, requires } from "../Assert";
import { ArrayMember } from "./Enumeration";
import { Map_reverse } from "../Collections/Map";
import { Set_hasAny } from "../Collections/Set";
import { panic } from "../Errors";

/////////////////////
// StringEnum type //
/////////////////////

export type StringEnum_Member<EAny extends StringEnum<any>> =
    EAny extends StringEnum<infer E> ? E : never
;

// Techincally, this stuff should be stratified by features
export interface StringEnum<E extends string> 
extends Iterable<E> {
    /** All values, in ascending order. */
    readonly values: readonly E[];
    /** Default value for this enum. 
     * 
     * Note that reserved names can used for properties (but not for identifiers). */
    readonly default: E;
    
    /** Returns a new {@link StringEnum} with a different {@link default}. */
    withDefault(newDefault: E): StringEnum<E>;
    
    /** All values as a set. Renamed for intellisense. */
    readonly setOfValues: ReadonlySet<E>;
    
    /** Checks if a random value belongs to this enum. */
    hasInstance(x: unknown): x is E;
    
    /** The smallest value in this enum. */
    readonly minimum: E;
    /** The largest value in this enum. */
    readonly maximum: E;
    
    /** Checks if 2 enum values are equal. */
    readonly equals: EqualityComparer<E>;
    /** Compares two enum values. */
    readonly compare: Comparer<E>;
    /** Returns the larger of two enum values. */
    max(a: E, b: E): E;
    /** Returns the smaller of two enum values. */
    min(a: E, b: E): E;
    
    getOrdinal(x: E): number;
    fromOrdinal(ord: number): E | undefined;
}

//////////////////////////
// Creating StringEnums //
//////////////////////////

// How to name this...
// algebraic thing where you convert it, do a thing, then convert it back
// functor? homomorphism? idk
function oneway_thingy<E extends readonly string[], T>(
    values: E,
    func: (a: number, b: number) => T
): (a: ArrayMember<E>, b: ArrayMember<E>) => T {
    
    return (a, b) => {
        const ind_a = values.indexOf(a);
        const ind_b = values.indexOf(b);
        
        ensures(ind_a !== Array_IndexNotFound);
        ensures(ind_a !== Array_IndexNotFound);
        
        return func(ind_a, ind_b);
    };
}

function andbackagain_thingy<E extends readonly string[]>(
    values: E,
    func: (a: number, b: number) => number
): (a: ArrayMember<E>, b: ArrayMember<E>) => ArrayMember<E> {
    const oneway = oneway_thingy(values, func);
    return (a, b): ArrayMember<E> => {
        const result = values[oneway(a, b)];
        ensures(result !== undefined, () => `Function '${func.name}' return out of range.`);
        return result;
    };
}

type StringEnum_Initializer<E extends string> =
    | readonly E[]
    | { readonly [P in E]: number }
;

type OrdinalMap<E extends string> = ReadonlyMap<E, number>;

function OrdinalMap_fromInitializer<E extends string>(values: StringEnum_Initializer<E>): OrdinalMap<E> {
    const result = new Map<E, number>();
    const usedNames = new Set<E>();
    const usedOrdinals = new Set<number>();
    
    function addMember(name: E, ordinal: number): void {
        requires(!usedNames.has(name), `Duplicate name '${name}'.`);
        requires(!usedOrdinals.has(ordinal), `Duplicate ordinal '${ordinal}'`);

        result.set(name, ordinal);

        usedNames.add(name);
        usedOrdinals.add(ordinal);
    }
    
    if (values instanceof Array) {
        let iota = 0;
        for (const name of values) {
            addMember(name, iota++);
        }
    } else {
        for (const name in values) {
            const ordinal = values[name];
            addMember(name, ordinal);
        }
    }
    
    return result;
}


function createStringEnumWithOrdinals<E extends string>(ordinalByMember: OrdinalMap<E>): StringEnum<E> {
    requires(ordinalByMember.size > 0, `StringEnum must not be empty.`);

    const memberByOrdinal = Map_reverse(ordinalByMember);
    const leastOrdinal = Math.min(...ordinalByMember.values());
    
    const defaultValue = (
        memberByOrdinal.get(0) ??
        memberByOrdinal.get(leastOrdinal) ??
        panic("Ordinal was empty?")
    );
    
    const values = Array.from(ordinalByMember.keys());
    const setOfValues = new Set(values);
    requires(setOfValues.size === values.length, "All members must be unique.");
    
    const hasInstance = (x: unknown): x is E => Set_hasAny(setOfValues, x);
    
    const equals = oneway_thingy(values, System_equals);
    const compare = oneway_thingy(values, System_compare);
    const min = andbackagain_thingy(values, Math.min);
    const max = andbackagain_thingy(values, Math.max);
    
    const minimum = Array_firstElement<E>(values) ?? panic();
    const maximum = Array_lastElement<E>(values) ?? panic();
    
    const getOrdinal = (x: E): number => ordinalByMember.get(x) ?? panic(`Unknown member '${x}'.`);
    const fromOrdinal = (ord: number): E | undefined => memberByOrdinal.get(ord);
    
    const result: StringEnum<E> = {
        values,
        equals,
        setOfValues,
        hasInstance,
        compare,
        min,
        max,
        minimum,
        maximum,
        default: defaultValue,
        getOrdinal,
        fromOrdinal,
        [Symbol.iterator]() {
            return values[Symbol.iterator]();
        },
        withDefault(newDefault) {
            // Alternative 1: Object spread
            return { ...this, default: newDefault };
            // Alternative 2: Prototype
            // const instance: StringEnum<E> = Object.create(this);
            // return Object.assign(instance, { default: newDefault });
        },
    };
    
    return result;  
}

export function StringEnum_create<E extends string>(values:
    | readonly E[]
    | { readonly [P in E]: number },
): StringEnum<E> {
    return createStringEnumWithOrdinals(OrdinalMap_fromInitializer(values));
}

////////////////////////////
// Companions for `enum`s //
////////////////////////////

const Alignment = StringEnum_create([
    "left",
    "center",
    "right"
] as const);

const enum2 = StringEnum_create([
    "top",
    "middle",
    "bottom",
] as const).withDefault("middle");

const enum3 = StringEnum_create({
    "black": 0, // mysterious inference error
    "red": 1,
    "green": 2,
    "white": 7,
    "unset": 9,
} as const).withDefault("unset");



for (const align of Alignment) {
    
}
