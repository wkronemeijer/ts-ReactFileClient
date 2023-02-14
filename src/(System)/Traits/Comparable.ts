import { typeof_t, TypeStringToType } from "../Types/Typeof";
import { Satisfies } from "../Types/Satisfies";

import { ElementType } from "../Collections/Iterable";
import { Ordering, Ordering_GT, Ordering_LT, Ordering_EQ } from "../Ordering";
import { notImplemented } from "../Errors";

// Q: Why not work this into compare?
// A: because string enums also want in the action, and those are not comparable (in the appropriate way)

/**

Goals of the new `compare`:
    Provide `ComparableObject` so classes can implement a custom comparison operator
    Provide looseCompare (or whatever name is appropriate) to compare any 2 values. 
    
    Ultimately sort on [
        compare(typeof x, typeof y), 
        compare(x.???.name, y.???.name), 
        x[compareTo](y)
    ]

undefined
null
false
true
-20
3
5
912387410928374n
"aap"
"abacus"
"acacia"
getName
setName
Book "The Genealogy of the Holy War"
Book "The Rediscovery of Atlantis"
Object {}
Point {}

Truthfully speaking, different derived classes can never be equal. Equal would mean interchangable, which these are not. And really, not a big deal in practical usage. How often are subclasses used? If you want that, provide your own cmp operator. 
    
    
Also notice that all the ???able.ts files share something: they try to establish behavior to all objects, including primitives. 

compare
equals
getHashCode

All of them have "loose" version which accept anything.

Note that Comparable as a type no longer makes sense: everything can be compared these days. 

Well...almost everything. Technically any Objects can be compared, but compare should really give a type error when it doesn't have the appropriate symbol. 


 */

//////////////
// Comparer //
//////////////

// TODO: As of TS 4.6.7.8 whatever you can do supply type arguments without calling a function.
// So replace with Array<T>.prototype
type Array_comparer = NonNullable<Parameters<(typeof Array.prototype)["sort"]>[0]>;
export type Comparer<T> = Satisfies<Array_comparer, 
    (a: T, b: T) => Ordering
>;

////////////////////////
// Compare primitives //
////////////////////////

const primitiveOrdering = Object.keys({
    "foo": 4
} as const)

type ComparablePrimitive    = TypeStringToType<ElementType<typeof ComparablePrimitive_ValueSet>>;
const ComparablePrimitive_ValueSet = new Set([
    "boolean",
    "number",
    "bigint",
    "string",
] as const);

function ComparablePrimitive_hasInstance(x: unknown): x is ComparablePrimitive {
    return ComparablePrimitive_ValueSet.has(typeof x as any);
}

function ComparablePrimitive_canCompare(x: ComparablePrimitive, y: unknown): y is ComparablePrimitive {
    return typeof x === typeof y
}

function ComparablePrimitive_compare<T extends ComparablePrimitive>(
    lhs: T, rhs: T,
): Ordering {
    if      (lhs > rhs) return Ordering_GT;
    else if (lhs < rhs) return Ordering_LT;
    else                return Ordering_EQ;
}

////////////////////////
// Compare comparable //
////////////////////////

export const ComparableObject_compareTo = Symbol("ComparableObject_compareTo");

// Now why use a symbol when a normal method would suffice?
// There is a matter of extensibility
// But more important its to force you use `compare`
// for every type, primitives and object alike.
export interface ComparableObject {
    [ComparableObject_compareTo](other: this): Ordering;
}

export interface ComparableObjectMk2<
    Self extends ComparableObjectMk2<Self>,
> {
    compare(other: Self): Ordering;
}

function ComparableObject_hasInstance(x: unknown): x is ComparableObject {
    return (
        typeof x === "object"                               &&
        x !== null                                          &&
        ComparableObject_compareTo in x                     && 
        typeof x[ComparableObject_compareTo] === "function"
    );
}

// Liskov substitution helps us out here
// Reminds me, LSP is kind of like the Functor laws from Haskell
function ComparableObject_canCompare<T extends ComparableObject>(
    lhs: T,
    rhs: unknown,
): rhs is T {
    return (
        ComparableObject_hasInstance(rhs) &&
        lhs[ComparableObject_compareTo] === rhs[ComparableObject_compareTo]
    )
}

function ComparableObject_compare<T extends ComparableObject>(
    lhs: T, rhs: T,
): Ordering {
    return lhs[ComparableObject_compareTo](rhs);
}

////////////////////
// Compare arrays //
////////////////////

/////////////////////
// Generic compare //
/////////////////////

/** Object that is explicitly comparable. Object can implement {@link ComparableObject}. */
export type Comparable =
    | ComparablePrimitive
    | ComparableObject
;

function Comparable_hasInstance(x: unknown): x is Comparable {
    return (
        ComparablePrimitive_hasInstance(x) ||
        ComparableObject_hasInstance(x)
    );
}

function getComparisonName(a: unknown): string {
    notImplemented();
}

function compareAlike(a: unknown, b: unknown): Ordering {
    notImplemented();
}


/** Compares two values of the same type. */
export function compareLoosely(a: unknown, b: unknown): Ordering {
    if (
        ComparablePrimitive_hasInstance(a) && 
        ComparablePrimitive_canCompare(a, b)
    ) {
        return ComparablePrimitive_compare(a, b);
    } else if (
        ComparableObject_hasInstance(a) && 
        // TODO: the relevant bit is that the compare function for both is the same, so that the result is symmetric
        ComparableObject_canCompare(a, b)
    ) {
        return ComparableObject_compare(a, b);
    } else {
        return ComparablePrimitive_compare(
            getComparisonName(a), 
            getComparisonName(b),
        );
    }
}

// Uses compare if the two are of equal type, otherwise sorts by name of the constructor (LOL)
/** Compares two values of the same type. To compare any two values, use {@link compareLoosely}. */
export const compare: 
    <T extends Comparable>(a: T, b: T) => Ordering 
    = compareLoosely satisfies Comparer<Comparable>
;

//////////////
// Delegate //
//////////////

export interface ComparerDelegate<T> {
    readonly compare: Comparer<T>;
}

export const ComparerDelegate_default: ComparerDelegate<any> = { compare };

///////////////////
// Lexicographic //
///////////////////

/////////////
// Sandbox //
/////////////
