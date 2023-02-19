import { requires } from "../../../(System)/Assert";

import { BoncleDisplayElement, BoncleElement, BoncleMyOpinion, BoncleMyPossession, BoncleSetSize, BoncleSex, BoncleSpecies, BoncleTheme } from "./Definitions/StandardEnums";
import { ReadonlyBoncleTagCollection } from "./TagCollection";
import { BoncleSetNumber } from "./SetNumber";

export class BoncleSet {
    readonly displayElement: BoncleDisplayElement;
    readonly trueElement   : BoncleElement;
    readonly possession    : BoncleMyPossession;
    readonly opinion       : BoncleMyOpinion;
    readonly setSize       : BoncleSetSize;
    readonly species       : BoncleSpecies;
    readonly theme         : BoncleTheme;
    readonly year          : number;
    readonly sex           : BoncleSex | undefined;
    
    constructor(
        public readonly setNumber   : BoncleSetNumber,
        public readonly title       : string,
        public readonly originalTags: ReadonlyBoncleTagCollection,
        public readonly tags        : ReadonlyBoncleTagCollection,
    ) {
        requires(originalTags.isUnexpanded());
        
        this.year = tags.determineYear();
        this.sex  = tags.search(BoncleSex);
        
        // You could do a generic solution...
        // The real pain of making your code better
        this.displayElement = tags.find(BoncleDisplayElement);
        this.trueElement    = tags.find(BoncleElement       );
        this.possession     = tags.find(BoncleMyPossession  );
        this.setSize        = tags.find(BoncleSetSize       );
        this.species        = tags.find(BoncleSpecies       );
        this.opinion        = tags.find(BoncleMyOpinion     );
        this.theme          = tags.find(BoncleTheme         );
    }
}
