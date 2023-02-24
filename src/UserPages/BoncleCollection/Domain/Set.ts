import { requires } from "../../../(System)/Assert";

import { BoncleDisplayElement, BoncleElement, BoncleMyOpinion, BoncleMyPossession, BoncleSetSize, BoncleSpecies, BoncleGeneration } from "./Definitions/StandardEnums";
import { ReadonlyBoncleTagCollection } from "./TagCollection";
import { BoncleSetNumber } from "./SetNumber";
import { ComparableObject } from "../../../(System)/Traits/Comparable/Comparable";
import { Ordering } from "../../../(System)/Traits/Comparable/Ordering";
import { compare } from "../../../(System)/Traits/Comparable/Compare";

export class BoncleSet implements ComparableObject {
    // Interesting properties
    readonly bricksetUrl: string;
    
    readonly previewUrl  : string;
    readonly previewAlt  : string;
    readonly previewTitle: string;
    
    // Cached tags method results
    readonly year: number;
    
    readonly displayElement: BoncleDisplayElement;
    readonly trueElement   : BoncleElement;
    readonly possession    : BoncleMyPossession;
    readonly generation    : BoncleGeneration;
    readonly opinion       : BoncleMyOpinion;
    readonly setSize       : BoncleSetSize;
    readonly species       : BoncleSpecies;
    
    constructor(
        public readonly setNumber   : BoncleSetNumber,
        public readonly title       : string,
        public readonly originalTags: ReadonlyBoncleTagCollection,
        public readonly tags        : ReadonlyBoncleTagCollection,
    ) {
        requires(originalTags.isUnexpanded());
        
        this.bricksetUrl  = `https://brickset.com/sets/${setNumber}`;
        
        this.previewUrl   = `./ImageCache/${setNumber}.jpg`;
        this.previewAlt   = `A picture of LEGO set number ${setNumber}.`;
        this.previewTitle = tags.toString();
        
        this.year = tags.determineYear();
        
        // You could do a generic solution...
        // The real pain of making your code better
        this.displayElement = tags.find(BoncleDisplayElement);
        this.setSize        = tags.find(BoncleSetSize       );
        this.species        = tags.find(BoncleSpecies       );
        
        this.trueElement    = tags.find(BoncleElement       );
        this.possession     = tags.find(BoncleMyPossession  );
        this.generation     = tags.find(BoncleGeneration    );
        this.opinion        = tags.find(BoncleMyOpinion     );
    }
    
    compare(other: this): Ordering {
        // Sorry in advance for the formatting
        return Ordering(
                     compare(this.year          , other.year          ) || 
       BoncleSetSize.compare(this.setSize       , other.setSize       ) || 
       BoncleSpecies.compare(this.species       , other.species       ) || 
BoncleDisplayElement.compare(this.displayElement, other.displayElement) || 
                     compare(this.setNumber     , other.setNumber     ) 
        );
    }
}
