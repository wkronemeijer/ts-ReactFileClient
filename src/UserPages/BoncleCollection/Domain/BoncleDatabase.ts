import { identity } from "../../../(System)/Function";
import { from } from "../../../(System)/Collections/Linq";

import { BoncleDisplayElement, BoncleSetSize } from "./CommonDomains";
import { __boncleTemplateDatabase } from "./RawBoncleDatabase";
import { BoncleTagSystem } from "./TagSystem";
import { BoncleSetNumber } from "./SetNumber";
import { BoncleSet } from "./Set";

export const BoncleDatabase: ReadonlyMap<BoncleSetNumber, BoncleSet> = (function () {
    const btrs = new BoncleTagSystem;
    console.log(btrs.toString());

    return (
        from(__boncleTemplateDatabase)
        .select(btrs.instantiate)
        // fuck <...>
        .where(set => !set.tags.has("playset"))
        .where(set => !set.tags.has("booster"))
        .where(set => !set.tags.has("combinerModel"))
        // sorting
        .orderOn(set => set.setNumber)
        .orderOn(set => set.element, BoncleDisplayElement)
        .orderOn(set => set.size, BoncleSetSize)
        .orderOn(set => set.year)
        // finalizing
        .toMap(set => set.setNumber, identity)
    );
}());
