// there were a bunch of exceptions here, but almost all of those were programming errors
// i.e. stuff which shouldn't error at all.
// Now it is a load of functions which `throw new Error` in creative ways.


///////////////////////
// Core of the issue //
///////////////////////

// Called issue because bug was too judgemental
/** Splits errors between "exceptions" and "bugs". This base class is for the latter. */
export class Issue extends Error { }
// FEATURE: Automatically create a github issue when one of these is thrown.

///////////////////////////////
// Throwing in creative ways //
///////////////////////////////

/** Marks a function as not (yet) implemented. */
export function notImplemented(): never {
    throw new Issue("This method is not (yet) implemented.");
}

/** Marks a function as abstract. */
export function abstract(): never {
    throw new Issue("This method is abstract.");
}

// Useful when deep in a conditional expression, and no options remain.
/** Throw an error, when no other course of action remains. */
export function panic(reason = "No reason given."): never {
    throw new Issue(reason);
}
