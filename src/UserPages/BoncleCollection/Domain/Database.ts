import { Map_increment } from "../../../(System)/Collections/Map";
import { assert } from "../../../(System)/Assert";
import { panic } from "../../../(System)/Errors";
import { from } from "../../../(System)/Collections/Sequence";

import { __boncleTemplateDatabase } from "./Definitions/RawDatabase";
import { BoncleTagSystem } from "./TagSystem";
import { BoncleSetNumber } from "./SetNumber";
import { BoncleTag } from "./Tag";
import { BoncleSet } from "./Set";

const isPublic = BoncleTag.isPublic;

export const BoncleDatabase = new class implements Iterable<BoncleSet> {
    readonly sets: readonly BoncleSet[];
    readonly size: number;
    
    private readonly setsByNumber: ReadonlyMap<BoncleSetNumber, BoncleSet>;
    private readonly frequencyByTag: ReadonlyMap<BoncleTag, number>;
    
    readonly stats: {
        readonly mostCommonPublicTag: {
            readonly value: BoncleTag;
            readonly frequency: number;
        };
        /** Tags which appear only on 1 set (which makes them not useful). */
        readonly singleTags: readonly BoncleTag[];
    } & BoncleTagSystem["stats"];
    
    private createFrequencyMap(sets: readonly BoncleSet[]): ReadonlyMap<BoncleTag, number> {
        const result = new Map<BoncleTag, number>;
        for (const set of sets) {
            for (const tag of set.tags) {
                Map_increment(result, tag);
            }
        }
        return result;
    }
    
    private checkSetInvariants() {
        
    }
    
    private checkTagInvariants() {
        assert(this.getTagFrequency("selection") === 0, 
            `Tag 'selection' should be empty.`);
    }
    
    private createStats(btrs: BoncleTagSystem): typeof this.stats {
        let mostCommonPublicTag: BoncleTag = "__default__";
        let mostCommonPublicTagFrequency = 0;
        const singleTags = new Array<BoncleTag>;
        
        for (const [tag, freq] of this.frequencyByTag) {
            if (isPublic(tag) && freq > mostCommonPublicTagFrequency) {
                mostCommonPublicTag = tag;
                mostCommonPublicTagFrequency = freq;
            }
            
            if (freq === 1) {
                singleTags.push(tag);
            }
        }
        
        return Object.assign({ 
            mostCommonPublicTag: {
                value: mostCommonPublicTag, 
                frequency: mostCommonPublicTagFrequency,
            },
            singleTags,
        }, btrs.stats);
    }
    
    constructor() {
        const btrs = new BoncleTagSystem;
        const sets =
            // make sets
            from(__boncleTemplateDatabase)
            .select(template => 
                BoncleSet.instantiate(template, btrs.expand))
            .where(set => !set.tags.has("_excluded"))
            .orderBy((a, b) => a.compare(b))
            // done
            .toArray()
        ;
        
        this.sets           = sets;
        this.size           = sets.length;
        this.setsByNumber   = from(sets).toMapBy(set => set.setNumber);
        this.frequencyByTag = this.createFrequencyMap(sets);
        
        this.checkSetInvariants();
        this.checkTagInvariants();
        
        this.stats = this.createStats(btrs);
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
