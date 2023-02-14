import { requires } from "../../../(System)/Assert";
import { from } from "../../../(System)/Collections/Linq";
import { BoncleTag } from "./Definitions/StandardTags";

export class BoncleTagRule {
    
    readonly consequent: ReadonlySet<BoncleTag>;
    
    constructor(
        // 1 antecedent greatly limits the inferral power
        // simultaneously, makes it a lot cheaper to test for cycles.
        readonly antecedent: BoncleTag,
        consequent: Iterable<BoncleTag>
    ) {
        this.consequent = new Set(consequent);
        requires(!this.consequent.has(antecedent));
    }
    
    toString(): string {
        return `${this.antecedent} -> ${from(this.consequent)}`;
    }
}
