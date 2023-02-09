

// aaaaaand the award for the must useless function goes to:
// Exists for symmetry with 

import { Comparable, compare } from "../Traits/Comparable";

/** Returns the first valid index of an array. */
export function Array_firstIndex(array: ArrayLike<any>): number | undefined {
    return (array.length > 0) ? 0 : undefined;
}

/** Returns the last valid index of an array. */
export function Array_lastIndex(array: ArrayLike<any>): number | undefined {
    return (array.length > 0) ? (array.length - 1) : undefined;
}

export function Array_firstElement<T>(array: ArrayLike<T>): T | undefined {
    return array[0];
}

export function Array_lastElement<T>(array: ArrayLike<T>): T | undefined {
    return array[array.length - 1];
}

/** Picks a random element from an array and returns it. Returns undefined if the array is empty. */
export function Array_randomElement<T>(array: ArrayLike<T>): T | undefined {
    const index = Math.trunc(Math.random() * array.length);
    return array[index];
}

/** Value indicating that the requested item was not found. */
export const Array_IndexNotFound = -1;


/** "Soft freezes" (= cools) an array by removing the mutation methods from the type. Useful if you are using template literal type maps over the `_Values` of an enumeration. */
export function Array_cool<T>(array: T[]): readonly T[] {
    return array;
}

// TODO: should have its on Types/ module
export function Array_normalize<T>(singletonOrList: T | readonly T[]): readonly T[] {
    return singletonOrList instanceof Array ? singletonOrList : [singletonOrList];
}

export function Array_insertInOrder<T extends Comparable>(list: T[], element: T): void {
    list.push(element);
    list.sort(compare);
}

export function Array_shuffle<T>(array: T[]): void {
    // https://stackoverflow.com/a/2450976
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        
        // Pick a remaining element.
        randomIndex = Math.floor(currentIndex * Math.random());
        currentIndex--;
        
        // And swap it with the current element.
        [
            array[currentIndex],
            array[randomIndex]
        ] = [
            array[randomIndex]!,
            array[currentIndex]!,
        ];
    }
}
