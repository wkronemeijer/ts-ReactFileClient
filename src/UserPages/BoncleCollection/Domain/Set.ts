import { BoncleTagSet, BoncleTagSet_determineYear, BoncleTagSet_extract, BoncleTagSet_extractDefault } from "./TagSet";
import { BoncleDisplayElement, BoncleTheme } from "./CommonDomains";
import { BoncleSetNumber } from "./SetNumber";

export class BoncleSet {
    readonly yearOfRelease : number;
    readonly theme         : BoncleTheme;
    readonly displayElement: BoncleDisplayElement | undefined;
    
    constructor(
        public readonly setNumber: BoncleSetNumber,
        public readonly title    : string,
        public readonly tags     : BoncleTagSet,
    ) {
        this.yearOfRelease  = BoncleTagSet_determineYear(tags);
        this.theme          = BoncleTagSet_extractDefault(tags, BoncleTheme);
        this.displayElement = BoncleTagSet_extract(tags, BoncleDisplayElement);
    }
}
