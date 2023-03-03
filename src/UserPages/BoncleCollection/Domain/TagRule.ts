import { StringBuildable, StringBuilder } from "../../../(System)/Text/StringBuilder";
import { requires } from "../../../(System)/Assert";

import { BoncleTag } from "./Definitions/Tag";

export class BoncleTagRule implements StringBuildable<[padded: boolean]> {
    /** Tags added when the antecedent appears in the tag list. */
    readonly sequents: ReadonlySet<BoncleTag>;
    
    // 1 antecedent greatly limits the inferral power
    // simultaneously, it makes it a lot simpler.
    constructor(
        /** Tag that expands to the consequents. */
        readonly antecedent: BoncleTag,
        consequent: Iterable<BoncleTag>,
        /** Non-negative weight added to tags expanded through this rule. */
        readonly weight: number = 1,
    ) {
        requires(weight >= 0, "weight must be non-negative.");
        this.sequents = new Set(consequent);
    }
    
    //////////////////////////
    // implements Printable //
    //////////////////////////
    
    buildString(result: StringBuilder, padded: boolean): void {
        if (padded) {
            result.append(this.antecedent.padEnd(BoncleTag.maxLength));
        } else {
            result.append(this.antecedent);
        }
        result.append(" --(");
        result.append(this.weight.toString());
        result.append(")->");
        for (const seq of this.sequents) {
            if (BoncleTag.isPublic(seq)) {
                result.append(' ')
                result.append(seq);
            }
        }
    }
    
    toString(padded = false): string {
        return StringBuilder.stringify(this, padded);
    }
}
