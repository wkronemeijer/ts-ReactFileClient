import { StringBuilder } from "../../../(System)/Text/StringBuilder";
import { Map_update } from "../../../(System)/Collections/Map";
import { requires } from "../../../(System)/Assert";
import { Stack } from "../../../(System)/Collections/Stack";
import { panic } from "../../../(System)/Errors";
import { from } from "../../../(System)/Collections/Sequence";

import { BoncleTagCollection, ReadonlyBoncleTagCollection } from "./TagCollection";
import { BoncleSetNumber_hasInstance } from "./SetNumber";
import { BoncleTagStandardRules } from "./Definitions/StandardRules";
import { BoncleTagImpliedRules } from "./Definitions/ImpliedRules";
import { BoncleSetTemplate } from "./SetTemplate";
import { BoncleTagRule } from "./TagRule";
import { BoncleTag } from "./Definitions/Tag";
import { BoncleSet } from "./Set";

/*
The idea:

given tags a b c d e
rules a --> b, b --> c
then tl(a) == { a, b, c }

given tags b, d
set = tl(b) | tl(d) | ...
strings value equality to the rescue...

Also tracks depth 
given a, b, c; a -> c and set = {b, c}

search({a   }, set) == c, but
search({a, b}, set) == b

search prefers arguments with the least depth

*/

type  RuleMap = ReadonlyMap<BoncleTag, BoncleTagRule>;
const RuleMap =         Map<BoncleTag, BoncleTagRule>;

export interface BoncleTagSystemStats {
    readonly setCount: number;
    readonly tagCount: number;
    readonly standardRuleCount: number;
    readonly impliedRuleCount: number;
}

export class BoncleTagSystem {
    readonly stats: BoncleTagSystemStats;
    
    private readonly ruleByAntecendent: RuleMap;
    
    constructor() {
        const tags  = [...BoncleTag];
        const rules = [...BoncleTagStandardRules, ...BoncleTagImpliedRules];
        
        const rba = new RuleMap;
        
        for (const tag of tags) {
            rba.set(tag, BoncleTagRule.empty(tag));
        }
        
        for (const rule of rules) {
            Map_update(rba, rule.antecedent, panic, acc => acc.join(rule));
        }
        
        this.ruleByAntecendent = rba;
        this.stats = {
            setCount: -1,
            tagCount: -1,
            standardRuleCount: -1,
            impliedRuleCount: -1,
        }
    }
    
    //////////////////////////////////////
    // implements TagCollectionExpander //
    //////////////////////////////////////
    
    private getRule(tag: BoncleTag): BoncleTagRule {
        return this.ruleByAntecendent.get(tag) ?? panic();
    }
    
    private expand(ogTags: ReadonlyBoncleTagCollection): BoncleTagCollection {
        const result = new BoncleTagCollection(ogTags);
        
        let current: BoncleTag | undefined;
        // Should be a stack...and yet it shouldn't affect the result
        // ...famous last words
        /** All tags recently touched */
        const frontier: Stack<BoncleTag> = [...result];
        while (current = frontier.pop()) {
            frontier.push(...result.applyRule(this.getRule(current)));
        }
        
        return result;
    }
    
    ////////////////////////////////////////
    // implements TagTemplateInstantiator //
    ////////////////////////////////////////
    
    instantiate = (template: BoncleSetTemplate): BoncleSet => {
        const id           = template.i;
        requires(BoncleSetNumber_hasInstance(id), 
            () => `'${id}' is not a valid set number.`);
        const title        = template.n;
        const originalTags = BoncleTagCollection.from(template.t);
        const expandedTags = this.expand(originalTags);
        return new BoncleSet(id, title, originalTags, expandedTags);
    }
    
    ////////////////////////////////
    // implements StringBuildable //
    ////////////////////////////////
    
    buildString(builder: StringBuilder, displayHidden: boolean): void {
        builder.appendLine(`BoncleTagSystem contents:`);
        builder.indent();
        
        const size = from(this.ruleByAntecendent.keys()).max(key => key.length);
        
        for (const [antecedent, rule] of this.ruleByAntecendent) {
            if (
                BoncleTag.isInternal(antecedent) || 
                rule.sequents.size === 0
            ) {
                continue;
            }
            
            const publicTags   = from(rule.sequents).where(BoncleTag.isPublic  ).toString(' ');
            const internalTags = from(rule.sequents).where(BoncleTag.isInternal).toString(' ');
            
            builder.append(antecedent.padEnd(size));
            builder.append(" ⟶");
            if (publicTags) {
                builder.append(' ');
                builder.append(publicTags);
            }
            if (displayHidden && internalTags) {
                builder.append(' ');
                builder.append(internalTags);
            }
            builder.appendLine();
        }
        builder.dedent();
    }
    
    toString(displayHidden = false): string {
        return StringBuilder.stringify(this, displayHidden);
    }
}
