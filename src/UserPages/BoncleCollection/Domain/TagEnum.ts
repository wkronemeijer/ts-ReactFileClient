import { StringEnum, StringEnum_create, StringEnum_Initializer, StringEnum_Member } from "../../../(System)/Data/StringEnum";
import { ExpandType } from "../../../(System)/Types/Magic";

import { BoncleTagRoot, BoncleTagTree } from "./Definitions/TagTree";


export interface BoncleTagEnum<E extends string> 
extends StringEnum<E> {
    readonly __tagEnumBrand: true;
}

export type BoncleTagEnum_Member<E extends BoncleTagEnum<any>> = 
    ExpandType<StringEnum_Member<E>>
;

export function BoncleTagEnum_createShallow<E extends string>(values: StringEnum_Initializer<E>): BoncleTagEnum<E> {
    return StringEnum_create(values).extend(_ => ({
        __tagEnumBrand: true,
    }));
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

function *allKeys_iter(branch: BoncleTagTree): Iterable<keyof BoncleTagTree & string> {
    let childBranch: BoncleTagTree | undefined;
    for (const key in branch) {
        yield key;
        if (childBranch = branch[key]) {
            yield* allKeys_iter(childBranch);
        }
    }
}

function allKeys<T extends BoncleTagTree>(branch: T): AllKeys<T>[] {
    // Hack but the typechecker loves me now
    const __unsafeCast = (x: unknown): x is AllKeys<T> => typeof x === "string";
    return Array.from(allKeys_iter(branch)).filter(__unsafeCast); 
}

export function BoncleTagEnum_createDeep<T extends BoncleTagTree>(branch: T): BoncleTagEnum<AllKeys<T>> {
    return BoncleTagEnum_createShallow(allKeys(branch));
}
