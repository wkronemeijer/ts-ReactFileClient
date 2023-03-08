import { StringEnum, StringEnum_create, StringEnum_Initializer, StringEnum_Member } from "../../../(System)/Data/StringEnum";
import { __unsafeAssert } from "../../../(System)/Assert";
import { ExpandType } from "../../../(System)/Types/Magic";
import { collect } from "../../../(System)/Collections/Iterable";

import { BoncleTagTree } from "./Definitions/TagTree";

export interface BoncleTagEnum<E extends string> 
extends StringEnum<E> {
    readonly __tagEnumBrand: true;
}

export type BoncleTagEnum_Member<E extends BoncleTagEnum<any>> = 
    ExpandType<StringEnum_Member<E>>
;

function create<E extends string>(
    branch: BoncleTagTree,
    values: StringEnum_Initializer<E>
): BoncleTagEnum<E> {
    return StringEnum_create(values).extend(_ => ({
        __tagEnumBrand: true,
    } as const));
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
    let childBranch;
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
