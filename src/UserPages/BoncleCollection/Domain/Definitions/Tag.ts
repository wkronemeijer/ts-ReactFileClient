import { StringEnum_create } from "../../../../(System)/Data/StringEnum";
import { ExpandType } from "../../../../(System)/Types/Magic";
import { assert } from "../../../../(System)/Assert";

import { BoncleTagTree, BoncleTagRoot } from "./TagTree";

type AllKeys_StringKeys<T> = keyof T;
type AllKeys_Spread<T>     = T extends object ? AllKeys<T> : never;
type AllKeys<T> = 
    | AllKeys_StringKeys<T> 
    | AllKeys_Spread<T[AllKeys_StringKeys<T>]>
;
    
const whitespace = /\s/;

function simpleCheck(x: string): BoncleTag {
    assert(!whitespace.test(x));
    return x as BoncleTag;
}

function allKeys(root: BoncleTagTree): BoncleTag[] {
    return Array.from(allKeys_iter(root));
}

function* allKeys_iter(branch: BoncleTagTree): Iterable<BoncleTag> {
    let childBranch: BoncleTagTree | undefined;
    for (const key in branch) {
        yield simpleCheck(key);
        if (childBranch = branch[key]) {
            yield* allKeys_iter(childBranch);
        }
    }
}

const isHidden = (s: string) => s.startsWith('_');

export type  BoncleTag = ExpandType<AllKeys<typeof BoncleTagRoot>>;
export const BoncleTag = StringEnum_create(allKeys(BoncleTagRoot)).extend(_ => ({
    /** @bound */
    isPublic(self: BoncleTag): boolean {
        return !isHidden(self);
    },
    /** @bound */
    isInternal(self: BoncleTag): boolean {
        return isHidden(self);
    },
}));
