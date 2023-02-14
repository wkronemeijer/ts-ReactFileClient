import { assert } from "../../../(System)/Assert";
import { BoncleTag } from "./Definitions/StandardTags";
import { BoncleTagSet } from "./TagSet";

export class BoncleTagFilter {
    readonly include: BoncleTagSet;
    readonly exclude: BoncleTagSet;
    
    constructor(
        include: Iterable<BoncleTag>, 
        exclude: Iterable<BoncleTag>,
    ) {
        this.include = new Set(include);
        this.exclude = new Set(exclude);
    }
    
    static fromString(string: string): BoncleTagFilter | Error {
        try {
            const include = new Array<BoncleTag>;
            const exclude = new Array<BoncleTag>;
            
            for (const item of string.split(' ')) {
                let tag: BoncleTag;
                let target: BoncleTag[];
                
                if (item.startsWith("+")) {
                    target = include;
                    tag    = BoncleTag.check(item.slice(1));
                } else if (item.startsWith("-")) {
                    target = exclude;
                    tag    = BoncleTag.check(item.slice(1));
                } else {
                    target = include;
                    tag    = BoncleTag.check(item);
                }
                
                target.push(tag);
            }
            
            return new BoncleTagFilter(include, exclude);
        } catch (error) {
            assert(error instanceof Error);
            return error;
        }
    }
}
