import { Array_isEmpty, Array_lastElement } from "../../../(System)/Collections/Array";
import { identity, negate } from "../../../(System)/Function";
import { StringBuilder } from "../../../(System)/Text/StringBuilder";

import { BoncleTag } from "./Tag";
import { BoncleSet } from "./Set";

export class BoncleSetFilter {
    readonly completeTags  : readonly BoncleTag[];
    readonly incompleteTags: readonly string[];
    
    readonly lastTag   : string | undefined;
    readonly isEmpty   : boolean;
    readonly isComplete: boolean;
    
    readonly test: (set: BoncleSet) => boolean
    
    private constructor(
        readonly allTags     : readonly string[],
        readonly includedTags: readonly BoncleTag[],
        readonly excludedTags: readonly BoncleTag[],
    ) {
        this.completeTags   = allTags.filter(BoncleTag.hasInstance);
        this.incompleteTags = allTags.filter(negate(BoncleTag.hasInstance));
        
        this.lastTag    = Array_lastElement(this.allTags);
        this.isEmpty    = Array_isEmpty(this.completeTags);
        this.isComplete = Array_isEmpty(this.incompleteTags);
        
        this.test = (set: BoncleSet): boolean => {
            const setHasTag = (tag: BoncleTag) => set.tags.has(tag);
            return (
                includedTags.every(setHasTag) && // NB: forall ∅ == true 
                !excludedTags.some(setHasTag)    //     exists ∅ == false
            );
        };
    }
    
    static readonly default = new this([], [], []);
    
    /** 
     * Parse a filter from a string. 
     * Parsing never fails: 
     * non-tag strings are collected in {@link incompleteTags}
     * and the {@link isComplete} flag is set to false.
     */
    static fromString(string: string): BoncleSetFilter {
        const include = new Array<BoncleTag>;
        const exclude = new Array<BoncleTag>;
        const all     = new Array<string>;
        
        for (const item of string.split(' ').filter(identity)) {
            let tag: string;
            let target: Array<BoncleTag>;
            
            if (item.startsWith("+")) {
                target = include;
                tag    = item.slice(1);
            } else if (item.startsWith("-")) {
                target = exclude;
                tag    = item.slice(1);
            } else {
                target = include;
                tag    = item;
            }
            
            tag = BoncleTag.canonicalize(tag);
            
            all.push(tag);
            if (BoncleTag.hasInstance(tag)) {
                target.push(tag);
            }
        }
        
        return new BoncleSetFilter(all, include, exclude);
    }
    
    select(array: readonly BoncleSet[]): BoncleSet[] {
        return array.filter(this.test);
    }
    
    buildString(builder: StringBuilder): void {
        for (const yesTag of this.includedTags) {
            builder.append('+')
            builder.append(yesTag);
            builder.append(' ')
        }
        for (const noTag of this.excludedTags) {
            builder.append('-')
            builder.append(noTag);
            builder.append(' ')
        }
    }
    
    toString(): string {
        return StringBuilder.stringify(this).trim();
    }
}
