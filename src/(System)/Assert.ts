/////////////////////////////////////
// >>>                         <<< //
// >>> NO IMPORTS IN THIS FILE <<< //
// >>>                         <<< //
/////////////////////////////////////

// Motivation: 
//     if (!condition) {
//         throw new Error("Super long message");
//     }
// can get very verbose, so this helper function hopefully shortens it to
//     assert(condition, Error, "Super long message");
// at the very least it's more readable.
// even better if we just drop the message entirely.
//     assert(condition);

/////////////////////////
// Assertion functions //
/////////////////////////

/** A simple error message. */
type Message     = string;
/** A lazy error message, for when computing the error string is expensive. */
type LazyMessage = () => string;
/** A constructor for errors, with a room for a message. */
type UnaryErrorConstructor = new (message: Message) => Error;

// TypeScript requires us to explicitly type values with an assertion guard, 
// so we extract all the overloads to this interface.
// Also good to put some dev comments on these essential functions.
/** All overloads of our assertion function. */
export interface AssertionFunction {
    /** Asserts its first argument is `true`, otherwise throws an error. */
    (shouldBeTrue: unknown): asserts shouldBeTrue;
    /** Asserts its first argument is `true`, otherwise throws an error with the specified message. */
    (shouldBeTrue: unknown, assertMessage: Message): asserts shouldBeTrue;
    /** Asserts its first argument is `true`, otherwise throws an error with the specified computed message. */
    (shouldBeTrue: unknown, assertMessage: LazyMessage): asserts shouldBeTrue;
    /** Asserts its first argument is `true`, otherwise throws an error using the provided constructor. */
    (shouldBeTrue: unknown, errorConstructor: UnaryErrorConstructor): asserts shouldBeTrue;
    /** Asserts its first argument is `true`, otherwise throws an error using the provided constructor, with the specified message. */
    (shouldBeTrue: unknown, errorConstructor: UnaryErrorConstructor, errorMessage: Message): asserts shouldBeTrue;
    /** Asserts its first argument is `true`, otherwise throws an error using the provided constructor, with the specified computed message. */
    (shouldBeTrue: unknown, errorConstructor: UnaryErrorConstructor, errorMessage: LazyMessage): asserts shouldBeTrue;
}

function isUnaryErrorConstructor(candidate: unknown): candidate is UnaryErrorConstructor {
    return (
        typeof candidate === "function" && 
        candidate.prototype instanceof Error
    );
    // Can't check length because it is not inherited. (:?)
    // arrow functions have no prototype property
    // normal functions have Object as prototype.constructor
    // open for better methods
}

function unlazy(producer: Message | LazyMessage | undefined): string | undefined{
    return (typeof producer === "function") ? producer() : producer;
}

/** Creates a new assertion function, with new defaults for the error type and message. */
function createAssertionFunction(
    defaultErrorConstructor: UnaryErrorConstructor, 
    defaultErrorMessage    : string,
): AssertionFunction {
    return function __assert(
        shouldBeTrue: unknown,
        argument1?  : Message | LazyMessage | UnaryErrorConstructor,
        argument2?  : Message | LazyMessage,
    ): asserts shouldBeTrue {
        if (!shouldBeTrue) {
            let constructor: UnaryErrorConstructor;
            let message    : string               ;
            
            if (isUnaryErrorConstructor(argument1)) {
                constructor = argument1;
                message     = unlazy(argument2) ?? defaultErrorMessage;
            } else {
                constructor = defaultErrorConstructor;
                message     = unlazy(argument1) ?? defaultErrorMessage;
            }
            
            // This comment exist to not make me feel bad over the empty line above.
            throw new constructor(message);
        }
    }
}

///////////////////
// Error classes //
///////////////////
// Goal: Distinguishing between bugs and recoverable errors (= exceptions).
// from http://joeduffyblog.com/2016/02/07/the-error-model/#bugs-arent-recoverable-errors

// Really frustrating that JavaScript calls its exceptions "Error"s...

/** (working title) Recoverable error. */
export class Exception extends Error { }

//////////////////////////////////
// Standard assertion functions //
//////////////////////////////////

/** General assertion function for unrecoverable errors.*/
export const assert: AssertionFunction = createAssertionFunction(Error, "Assertion failed.");

/** Assertion function for pre-conditions. */
export const requires: AssertionFunction = createAssertionFunction(Error, "Pre-condition was not met.");

/** Assertion function for post-conditions. */
export const ensures: AssertionFunction = createAssertionFunction(Error, "Post-condition was not met.");

/** Assertion function for recoverable errors. */
export const guard: AssertionFunction = createAssertionFunction(Exception, "Guard failed.");

/** Assertion which are not checked. For readability. */
export const __unsafeAssert: AssertionFunction = () => {};
