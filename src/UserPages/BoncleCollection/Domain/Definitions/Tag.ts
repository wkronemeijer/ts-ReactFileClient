import { StringEnum_create } from "../../../../(System)/Data/StringEnum";
import { ExpandType } from "../../../../(System)/Types/Magic";
import { collect } from "../../../../(System)/Collections/Iterable";
import { assert } from "../../../../(System)/Assert";
import { Member } from "../../../../(System)/Data/Enumeration";

import { BoncleTagTree, BoncleTagTree_Root } from "./TagTree";
import { BoncleFluency } from "./StandardEnums";

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

const isHidden = (tag: string) => (
    tag.startsWith('_') || 
    BoncleFluency.hasInstance(tag)
);

export type  BoncleTag = ExpandType<AllKeys<typeof BoncleTagTree_Root>>;
export const BoncleTag = StringEnum_create(allKeys(BoncleTagTree_Root)).extend(Self => ({
    /** @bound */
    isPublic(self: Member<typeof Self>): boolean {
        return !isHidden(self);
    },
    /** @bound */
    isInternal(self: Member<typeof Self>): boolean {
        return isHidden(self);
    },
}));
