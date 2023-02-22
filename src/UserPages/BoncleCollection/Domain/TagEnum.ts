import { StringEnum, StringEnum_create, StringEnum_Initializer, StringEnum_Member } from "../../../(System)/Data/StringEnum";
import { assert, ensures, __unsafeAssert } from "../../../(System)/Assert";
import { ExpandType } from "../../../(System)/Types/Magic";
import { collect } from "../../../(System)/Collections/Iterable";
import { panic } from "../../../(System)/Errors";

import { BoncleTagTree, BoncleTagTree_Default } from "./Definitions/TagTree";

export interface BoncleTagEnum<E extends string> 
extends StringEnum<E> {
    readonly __tagEnumBrand: true;
}

export type BoncleTagEnum_Member<E extends BoncleTagEnum<any>> = 
    ExpandType<StringEnum_Member<E>>
;

const searchDefaults = collect(function* recurse(
    name  : string | undefined,  
    branch: BoncleTagTree,
): Iterable<string> {
    if (BoncleTagTree_Default in branch) {
        assert(name, "Subtree contained Default in root.");
        console.log(`Found default '${name}.'`);
        yield name;
    }
    
    let childBranch: BoncleTagTree | undefined;
    for (const key in branch) {
        if (childBranch = branch[key]) {
            yield* recurse(key, childBranch);
        }
    }
});

function create<E extends string>(
    branch: BoncleTagTree,
    values: StringEnum_Initializer<E>
): BoncleTagEnum<E> {
    const defaults = searchDefaults(undefined, branch);
    const result   = StringEnum_create(values).extend(_ => ({
        __tagEnumBrand: true,
    } as const));
    
    if (defaults.length > 1) {
        panic("More than one default in subtree.");
    } else if (defaults.length < 1) {
        return result;
    } else {
        const newDefault = defaults[0];
        ensures(result.hasInstance(newDefault));
        return result.withDefault(newDefault);
    }
}

export function BoncleTagEnum_createShallow<T extends BoncleTagTree>(branch :T): BoncleTagEnum<AllKeys_StringKeys<T>> {
    return create(branch, branch);
}

///////////////////
// Deep creation //
///////////////////

type AllKeys_StringKeys<T> = keyof T & string;
type AllKeys_Spread<T>     = T extends BoncleTagTree ? AllKeys<T> : never;
type AllKeys<T extends BoncleTagTree> = 
    BoncleTagTree extends T ? never : // is generic value, not specific
    | AllKeys_StringKeys<T>
    | AllKeys_Spread<T[AllKeys_StringKeys<T>]>
;

function check<T extends BoncleTagTree>(x: unknown): AllKeys<T> {
    return x as AllKeys<T>;
}

const allKeys = collect(function* recurse<T extends BoncleTagTree>(branch: T): Iterable<AllKeys<T>> {
    let childBranch: BoncleTagTree | undefined;
    for (const key in branch) {
        yield check<T>(key);
        if (childBranch = branch[key]) {
            yield* recurse(childBranch);
        }
    }
});

export function BoncleTagEnum_createDeep<T extends BoncleTagTree>(branch: T): BoncleTagEnum<AllKeys<T>> {
    return create(branch, allKeys(branch));
}
