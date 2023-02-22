import { identity } from "../../../(System)/Function";
import { from, Linq, Predicate } from "../../../(System)/Collections/Linq";

import { BoncleDisplayElement, BoncleSetSize, BoncleSpecies } from "./Definitions/StandardEnums";
import { __boncleTemplateDatabase } from "./RawDatabase";
import { BoncleTagSystem } from "./TagSystem";
import { BoncleSetNumber } from "./SetNumber";
import { BoncleSet } from "./Set";
import { panic } from "../../../(System)/Errors";
import { BoncleSetSelection } from "./SetSelection";

export const BoncleDatabase = new class implements Iterable<BoncleSet> {
    readonly setsByNumber: ReadonlyMap<BoncleSetNumber, BoncleSet>;
    readonly sets: readonly BoncleSet[];
    readonly size: number;
    
    constructor() {
        const btrs = new BoncleTagSystem;
        console.log(btrs.toString());
        
        this.sets = 
            // make sets
            from(__boncleTemplateDatabase)
            .select(btrs.instantiate)
            // screw playset|booster|combinerModel
            .where(set => !set.tags.has("playset"))
            .where(set => !set.tags.has("booster"))
            .where(set => !set.tags.has("combinerModel"))
            // sorting
            .orderOn(set => set.setNumber)
            .orderOn(set => set.displayElement, BoncleDisplayElement)
            .orderOn(set => set.species       , BoncleSpecies       )
            .orderOn(set => set.setSize       , BoncleSetSize       )
            .orderOn(set => set.year)
            // done
            .toArray()
        ;
        
        this.size = this.sets.length;
        
        this.setsByNumber = 
            from(this.sets)
            .associateBy(set => set.setNumber)
            .to(Map<BoncleSetNumber, BoncleSet>) // HKTs...one day.
        ;
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
    
    find = (id: BoncleSetNumber): BoncleSet => {
        return this.setsByNumber.get(id) ?? panic(
            `Unknown set number '${id}'.`);
    }
    
    where(test: Predicate<BoncleSet>): BoncleSet[] {
        return this.sets.filter(test);
    }
}
