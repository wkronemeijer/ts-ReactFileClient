import { requires } from "../../../(System)/Assert";
import { from } from "../../../(System)/Collections/Linq";
import { BoncleTag } from "./Definitions/Tag";

export class BoncleTagRule {
    readonly sequents: ReadonlySet<BoncleTag>;
    
    constructor(
        // 1 antecedent greatly limits the inferral power
        // simultaneously, makes it a lot cheaper to test for cycles.
        readonly antecedent: BoncleTag,
        consequent: Iterable<BoncleTag>
    ) {
        this.sequents = new Set(consequent);
    }
    
    static empty(antecedent: BoncleTag): BoncleTagRule {
        return new BoncleTagRule(antecedent, []);
    }
    
    join(other: BoncleTagRule): BoncleTagRule {
        requires(this.antecedent === other.antecedent, 
            `Antecedents must match.`);
        return new BoncleTagRule(this.antecedent, [...this.sequents, ...other.sequents]);
    }
    
    //////////////////////////
    // implements Printable //
    //////////////////////////
    
    toString(): string {
        return `${this.antecedent} -> ${from(this.sequents)}`;
    }
}
