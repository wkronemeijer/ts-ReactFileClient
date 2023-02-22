import { StringEnum_create } from "../../../../(System)/Data/StringEnum";
import { ExpandType } from "../../../../(System)/Types/Magic";
import { assert } from "../../../../(System)/Assert";

import { BoncleTagTree, BoncleTagRoot } from "./TagTree";
import { collect } from "../../../../(System)/Collections/Iterable";

type AllKeys_StringKeys<T> = keyof T & string;
type AllKeys_Spread<T>     = T extends object ? AllKeys<T> : never;
type AllKeys<T> = 
    | AllKeys_StringKeys<T> 
    | AllKeys_Spread<T[AllKeys_StringKeys<T>]>
;

const whitespace = /\s/;

function check(x: string): BoncleTag {
    assert(!whitespace.test(x), 
        () => `Tag '${x}' should not contain whitespace.`);
    return x as BoncleTag;
}

const allKeys = collect(function* recurse(
    branch: BoncleTagTree,
): Iterable<BoncleTag> {
    let childBranch: BoncleTagTree | undefined;
    for (const key in branch) {
        yield check(key);
        if (childBranch = branch[key]) {
            yield* recurse(childBranch);
        }
    }
});

const isHidden = (s: string) => s.startsWith('_');

export type  BoncleTag = ExpandType<AllKeys<typeof BoncleTagRoot>>;
export const BoncleTag = StringEnum_create(allKeys(BoncleTagRoot)).extend(Self => ({
    /** @bound */
    isPublic(self: BoncleTag): boolean {
        return !isHidden(self);
    },
    /** @bound */
    isInternal(self: BoncleTag): boolean {
        return isHidden(self);
    },
}));
