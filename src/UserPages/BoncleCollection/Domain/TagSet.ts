import { StringEnum } from "../../../(System)/Data/StringEnum";
import { BoncleReleaseSeason, BoncleReleaseYear } from "./CommonDomains";
import { BoncleTag } from "./Definitions/StandardTags";


export type  BoncleTagSet = ReadonlySet<BoncleTag>;
export const BoncleTagSet =         Set<BoncleTag>;

export function BoncleTagSet_extract<E extends BoncleTag>(
    self: BoncleTagSet,
    senum: StringEnum<E>,
): E | undefined{
    for (const item of senum) {
        if (self.has(item)) {
            return item;
        }
    }
}

export function BoncleTagSet_extractDefault<E extends BoncleTag>(
    self: BoncleTagSet,
    senum: StringEnum<E>,
): E {
    return BoncleTagSet_extract(self, senum) ?? senum.default;
}

/** Determines the year of release from a tag set. Also looks at season, and adds 0.5 to releases in the summer. */
export function BoncleTagSet_determineYear(self: BoncleTagSet): number {
    const rawYear = BoncleTagSet_extractDefault(self, BoncleReleaseYear);
    const season  = BoncleTagSet_extractDefault(self, BoncleReleaseSeason);
    return Number(rawYear) + (season === "summer" ? 0.5 : 0.0);
}
