// NB: Boolean("") == false
// Remember that!

import { Array_firstElement, Array_IndexNotFound, Array_lastElement } from "../Collections/Array";
import { equals as System_equals } from "../Traits/Equatable/Equals";
import { compare as System_compare } from "../Traits/Comparable/Compare";
import { assert, ensures, requires } from "../Assert";
import { EqualityComparer } from "../Traits/Equatable/EqualityComparer";
import { StringBuilder } from "../Text/StringBuilder";
import { ArrayMember } from "./Enumeration";
import { Map_reverse } from "../Collections/Map";
import { Set_hasAny } from "../Collections/Set";
import { Printable } from "../Traits/Printable";
import { Comparer } from "../Traits/Comparable/Comparer";
import { panic } from "../Errors";

/////////////////////
// StringEnum type //
/////////////////////

export type StringEnum_Member<EAny extends StringEnum<any>> =
    EAny extends StringEnum<infer E> ? E : never
;

// Techincally, this stuff should be stratified by features
export interface StringEnum<E extends string> 
extends Iterable<E>, Printable {
    /** All values, in ascending order. */
    readonly values: readonly E[];
    toString(): string;
    /** Default value for this enum. 
     * 
     * Note that reserved names can used for properties (but not for identifiers). */
    readonly default: E;
    
    /** Returns a new {@link StringEnum} with a different {@link StringEnum.default}. */
    withDefault(newDefault: E): this;
    
    /** Returns a new {@link StringEnum} with extra methods. */
    extend<M extends {}>(extraMethods: (Self: this) => M): this & M;
    
    /** All values as a set. Renamed for intellisense. */
    readonly setOfValues: ReadonlySet<E>;
    
    /** Verifies that given argument is a member of this enum. */
    check(x: unknown): E;
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
function oneway_thingy<EA extends readonly string[], T>(
    values: EA,
    func: (a: number, b: number) => T
): (a: ArrayMember<EA>, b: ArrayMember<EA>) => T {
    
    return (a, b) => {
        const ind_a = values.indexOf(a);
        const ind_b = values.indexOf(b);
        
        ensures(ind_a !== Array_IndexNotFound);
        ensures(ind_a !== Array_IndexNotFound);
        
        return func(ind_a, ind_b);
    };
}

function andbackagain_thingy<EA extends readonly string[]>(
    values: EA,
    func: (a: number, b: number) => number
): (a: ArrayMember<EA>, b: ArrayMember<EA>) => ArrayMember<EA> {
    const oneway = oneway_thingy(values, func);
    return (a, b): ArrayMember<EA> => {
        const result = values[oneway(a, b)];
        ensures(result !== undefined, () => `Function '${func.name}' return out of range.`);
        return result;
    };
}

export type  StringEnum_Placeholder = true;
/* Alright placeholder options:

true        -> simple
undefined   -> long, buggy
null        -> ewww
0           -> number, breaks code
"auto"      -> comphrehensive, long
"iota"      -> is what it is supposed to resemble
"++"        -> too fiddly
_           -> short, requires global symbol definition
__          -> different from ignored parameter, but overlaps with super-secret identifiers

*/

export type StringEnum_Initializer<E extends string> =
    | readonly E[]
    | { readonly [P in E]: unknown }
;

type OrdinalMap<E extends string> = ReadonlyMap<E, number>;

function OrdinalMap_fromInitializer<E extends string>(
    values: StringEnum_Initializer<E>,
): OrdinalMap<E> {
    const result       = new Map<E, number>;
    const usedNames    = new Set<E>;
    const usedOrdinals = new Set<number>;
    
    function addMember(name: E, ordinal: number): void {
        requires(!usedNames.has(name),       
            () => `Duplicate name '${name}'.`);
        requires(!usedOrdinals.has(ordinal), 
            () => `Duplicate ordinal '${ordinal}'.`);
        
        result.set(name, ordinal);
        usedNames.add(name);
        usedOrdinals.add(ordinal);
    }
    
    /** This stores the **next** ordinal. */
    let iota = 0;
    if (values instanceof Array) {
        for (const name of values) {
            addMember(name, iota++);
        }
    } else {
        for (const name in values) {
            const value   = Number(values[name]);
            const ordinal = isFinite(value) ? value : iota;
            addMember(name, ordinal);
            iota = ordinal + 1;
        }
    }
    
    return result;
}

function stringifyStringEnum<E extends string>(values: OrdinalMap<E>): string {
    const result = new StringBuilder();
    
    result.append("StringEnum { ");
    for (const [value, ordinal] of values) {
        
        result.append('"');
        result.append(value); // I would use util.inspect, but that requires node
        // TODO: Is there a universal util.inspect equivalent?
        // TODO: Write a util.inspect equivalent.
        result.append('" => ');
        result.append(ordinal.toString());
        result.append("; ");
    }
    result.append("}");
    
    return result.toString();
}

function createStringEnumWithOrdinals<E extends string>(ordinalByName: OrdinalMap<E>): StringEnum<E> {
    requires(ordinalByName.size > 0, `StringEnum must not be empty.`);
    
    const memberByOrdinal = Map_reverse(ordinalByName);
    const leastOrdinal    = Math.min(...ordinalByName.values());
    
    const defaultValue = (
        memberByOrdinal.get(0) ??
        memberByOrdinal.get(leastOrdinal) ??
        panic("Ordinal was empty?")
    );
    
    // FIXME: Should sort on ordinal
    const values = Array.from(ordinalByName.keys()).sort((a, b) => {
        const ordinalA = ordinalByName.get(a)!;
        const ordinalB = ordinalByName.get(b)!;
        return ordinalA - ordinalB;
    });
    
    const setOfValues = new Set(values);
    
    assert(setOfValues.size === values.length, "All members must be unique.");
    
    const hasInstance = (x: unknown): x is E => Set_hasAny(setOfValues, x);
    const check       = (x: unknown): E      => hasInstance(x) ? x : panic(`'${x}' is not a member.`);
    
    // | TODO: Wut? Why not `(a, b) => hasInstance(a) && a === b`?
    const equals  = oneway_thingy(values, System_equals);
    const compare = oneway_thingy(values, System_compare);
    const min     = andbackagain_thingy(values, Math.min);
    const max     = andbackagain_thingy(values, Math.max);
    
    const minimum = Array_firstElement<E>(values) ?? panic();
    const maximum = Array_lastElement <E>(values) ?? panic();
    
    const getOrdinal = (x: E): number => ordinalByName.get(x) ?? panic(`Unknown member '${x}'.`);
    const fromOrdinal = (ord: number): E | undefined => memberByOrdinal.get(ord);
    
    const toString = () => stringifyStringEnum(ordinalByName);
    
    const result: StringEnum<E> = {
        values,
        toString,
        equals,
        setOfValues,
        hasInstance,
        check,
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
            return { ...this, default: newDefault };
        },
        extend(extraMethodsFactory) {
            return { ...this, ...extraMethodsFactory(this) };
        }
    };
    
    return result;
}

export function StringEnum_create<E extends string>(values: StringEnum_Initializer<E>): StringEnum<E> {
    return createStringEnumWithOrdinals(OrdinalMap_fromInitializer(values));
}

////////////////////////////
// Companions for `enum`s //
////////////////////////////
