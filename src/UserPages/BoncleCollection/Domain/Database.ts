import { Map_increment } from "../../../(System)/Collections/Map";
import { ensures } from "../../../(System)/Assert";
import { panic } from "../../../(System)/Errors";
import { from } from "../../../(System)/Collections/Sequence";

import { __boncleTemplateDatabase } from "./RawDatabase";
import { BoncleTagSystem } from "./TagSystem";
import { BoncleSetNumber } from "./SetNumber";
import { BoncleSet } from "./Set";
import { BoncleTag } from "./Definitions/Tag";

export const BoncleDatabase = new class implements Iterable<BoncleSet> {
    readonly sets: readonly BoncleSet[];
    readonly size: number;
    
    private readonly setsByNumber: ReadonlyMap<BoncleSetNumber, BoncleSet>;
    private readonly frequencyByTag: ReadonlyMap<BoncleTag, number>;
    
    constructor() {
        const btrs = new BoncleTagSystem;
        console.log(btrs.toString());
        
        const sets = this.sets = 
            // make sets
            from(__boncleTemplateDatabase)
            .select(btrs.instantiate)
            // screw playset|booster|combinerModel
            .where(set => !set.tags.has("playset"))
            .where(set => !set.tags.has("booster"))
            .where(set => !set.tags.has("combinerModel"))
            // sorting
            .orderBy((a, b) => a.compare(b))
            // done
            .toArray()
        ;
        
        this.size = this.sets.length;
        
        this.setsByNumber = 
            from(this.sets)
            .associateBy(set => set.setNumber)
            .to(Map<BoncleSetNumber, BoncleSet>) // HKTs...one day.
        ;
        
        const frequencyByTag = this.frequencyByTag = new Map<BoncleTag, number>;
        
        for (const set of sets) {
            for (const tag of set.tags) {
                Map_increment(frequencyByTag, tag);
            }
        }
        
        ensures(this.getTagFrequency("selection") === 0, 
            `Tag 'selection' should be empty.`);
    }
    
    /////////////////////////
    // implements Iterable //
    /////////////////////////
    
    [Symbol.iterator](): Iterator<BoncleSet> {
        return this.sets.values();
    }
    
    ///////////////////////////////
    // implements BoncleDatabase //
    ///////////////////////////////
    
    getSetById(id: BoncleSetNumber): BoncleSet | undefined {
        return this.setsByNumber.get(id);
    }
    
    /** @bound */
    getTagFrequency = (tag: BoncleTag): number => {
        return this.frequencyByTag.get(tag) ?? 0;
    }
    
    /** @bound */
    find = (id: BoncleSetNumber): BoncleSet => {
        return this.getSetById(id) ?? panic(
            `Unknown set number '${id}'.`);
    }
}
