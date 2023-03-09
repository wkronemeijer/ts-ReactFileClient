import { ComparableObject } from "../../../(System)/Traits/Comparable/Comparable";
import { Ordering } from "../../../(System)/Traits/Comparable/Ordering";
import { compare } from "../../../(System)/Traits/Comparable/Compare";

import { BoncleDisplayElement, BoncleElement, BoncleMyOpinion, BoncleMyPossession, BoncleSetSize, BoncleSpecies, BoncleGeneration } from "./Definitions/StandardEnums";
import { BoncleTagCollection, BoncleTagCollectionExpander, ReadonlyBoncleTagCollection } from "./TagCollection";
import { BoncleSetNumber, BoncleSetNumber_getId } from "./SetNumber";
import { BoncleSetTemplate } from "./SetTemplate";

export class BoncleSet implements ComparableObject {
    // TODO: I may have too many fields on this class
    // OTOH you use all of them regularly, sooooo
    
    // Interesting properties
    readonly bricksetUrl: string;
    readonly bricklinkUrl: string;
    
    readonly previewUrl  : string;
    readonly previewAlt  : string;
    readonly previewTitle: string;
    
    // Cached tags method results
    readonly year: number;
    readonly title: string;
    readonly id: number;
    
    readonly species       : BoncleSpecies;
    readonly setSize       : BoncleSetSize;
    readonly displayElement: BoncleDisplayElement;
    readonly generation    : BoncleGeneration;
    
    readonly trueElement   : BoncleElement;
    readonly possession    : BoncleMyPossession;
    readonly opinion       : BoncleMyOpinion;
    
    constructor(
        public readonly setNumber: BoncleSetNumber,
        public readonly name     : string,
        public readonly tags     : ReadonlyBoncleTagCollection,
    ) {
        this.id = BoncleSetNumber_getId(setNumber);
        
        this.bricksetUrl  = `https://brickset.com/sets/${setNumber}`;
        this.bricklinkUrl = `https://www.bricklink.com/v2/catalog/catalogitem.page?S=${setNumber}`;
        
        this.previewUrl   = `./ImageCache/${setNumber}.jpg`;
        this.previewAlt   = `A picture of LEGO set number ${setNumber}.`;
        this.previewTitle = tags.toString();
        this.year         = tags.determineYear();
        
        this.species = tags.find(BoncleSpecies);
        this.title   = BoncleSpecies.getTitle(this.species);
        
        this.displayElement = tags.find(BoncleDisplayElement);
        this.setSize        = tags.find(BoncleSetSize       );
        this.trueElement    = tags.find(BoncleElement       );
        this.possession     = tags.find(BoncleMyPossession  );
        this.generation     = tags.find(BoncleGeneration    );
        this.opinion        = tags.find(BoncleMyOpinion     );
    }
    
    /** @bound */
    static instantiate(template: BoncleSetTemplate, expander: BoncleTagCollectionExpander): BoncleSet {
        const setNumber   = template.i;
        const name        = template.n;
        const initialTags = BoncleTagCollection.from(template.t);
        const tags        = expander(initialTags);
        return new BoncleSet(setNumber, name, tags);
    }
    
    compare(other: this): Ordering {
        // Sorry in advance for the formatting
        return Ordering(
            // year -> generation so it is skipped in sorting
                     compare(this.year          , other.year          ) || 
       BoncleSetSize.compare(this.setSize       , other.setSize       ) || 
       BoncleSpecies.compare(this.species       , other.species       ) || 
BoncleDisplayElement.compare(this.displayElement, other.displayElement) || 
                     compare(this.setNumber     , other.setNumber     ) 
        );
    }
}
