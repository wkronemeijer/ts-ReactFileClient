import { StringEnum } from "../../../(System)/Data/StringEnum";

import { BoncleReleaseYear } from "./CommonDomains";
import { BoncleTag } from "./Definitions/StandardTags";


export type  BoncleTagSet = ReadonlySet<BoncleTag>;
export const BoncleTagSet =         Set<BoncleTag>;

export function BoncleTagSet_search<E extends BoncleTag>(
    self: BoncleTagSet,
    senum: StringEnum<E>,
): E | undefined{
    for (const item of senum) {
        if (self.has(item)) {
            return item;
        }
    }
}

export function BoncleTagSet_find<E extends BoncleTag>(
    self: BoncleTagSet,
    senum: StringEnum<E>,
): E {
    return BoncleTagSet_search(self, senum) ?? senum.default;
}


export function BoncleTagSet_findLast<E extends BoncleTag>(
    self: BoncleTagSet,
    senum: StringEnum<E>,
): E {
    let result = senum.default;
    for (const item of senum) {
        if (self.has(item)) {
            result = item;
        }
    }
    return result;
}

// findLast and searchLast for size inference

/** Determines the year of release from a tag set. Also looks at season, and adds 0.5 to releases in the summer. */
export function BoncleTagSet_determineYear(self: BoncleTagSet): number {
    const rawYear = BoncleTagSet_find(self, BoncleReleaseYear);
    const isSummer  = self.has("mid");
    return Number(rawYear) + (isSummer ? 0.5 : 0.0);
}
