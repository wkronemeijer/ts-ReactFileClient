import { BoncleTagSet, BoncleTagSet_determineYear, BoncleTagSet_search, BoncleTagSet_find, BoncleTagSet_findLast } from "./TagSet";
import { BoncleDisplayElement, BoncleSetSize, BoncleSex, BoncleTheme } from "./CommonDomains";
import { BoncleSetNumber } from "./SetNumber";

export class BoncleSet {
    readonly element: BoncleDisplayElement;
    readonly theme  : BoncleTheme;
    readonly size   : BoncleSetSize;
    readonly year   : number;
    readonly sex    : BoncleSex | undefined;
    
    constructor(
        public readonly setNumber: BoncleSetNumber,
        public readonly title    : string,
        public readonly tags     : BoncleTagSet,
    ) {
        this.year    = BoncleTagSet_determineYear(tags);
        this.sex     = BoncleTagSet_search(tags, BoncleSex);
        this.element = BoncleTagSet_find(tags, BoncleDisplayElement);
        this.theme   = BoncleTagSet_find(tags, BoncleTheme);
        this.size    = BoncleTagSet_findLast(tags, BoncleSetSize);
    }
}
