import { StringBuildable, StringBuilder } from "../../../(System)/Text/StringBuilder";
import { requires } from "../../../(System)/Assert";
import { negate } from "../../../(System)/Function";
import { from } from "../../../(System)/Collections/Sequence";

import { BoncleTagRuleArrow } from "./TagRuleArrow";
import { BoncleTag } from "./Definitions/Tag";

const tagIsKept   = negate(BoncleTag.isErased);
const tagIsPublic = BoncleTag.isPublic;

export class BoncleTagRule implements StringBuildable<[padded: boolean]> {
    /** Tags added when the antecedent appears in the tag list. */
    readonly sequents: ReadonlySet<BoncleTag>;
    readonly weight: number;
    
    // 1 antecedent greatly limits the inferral power
    // simultaneously, it makes it a lot simpler.
    constructor(
        /** Tag that expands to the consequents. */
        readonly antecedent: BoncleTag,
        readonly arrow: BoncleTagRuleArrow,
        consequents: Iterable<BoncleTag>,
    ) {
        this.weight   = BoncleTagRuleArrow.getWeight(arrow);
        this.sequents = from(consequents).where(tagIsKept).toSet();
        
        for (const seq of this.sequents) {
            requires(BoncleTag.isOpen(seq), () => 
                `Sequent '${seq}' should be open.`);
        }
    }
    
    static default(tag: BoncleTag): BoncleTagRule {
        return new BoncleTagRule("__default__", "~~>", [tag]);
    }
    
    static implies(derived: BoncleTag, base: BoncleTag): BoncleTagRule {
        return new BoncleTagRule(derived, "-->", [base]);
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
            if (tagIsPublic(seq)) {
                result.append(' ')
                result.append(seq);
            }
        }
    }
    
    toString(padded = false): string {
        return StringBuilder.stringify(this, padded);
    }
}
