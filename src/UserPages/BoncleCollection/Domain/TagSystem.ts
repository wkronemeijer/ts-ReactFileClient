import { StringBuilder } from "../../../(System)/Text/StringBuilder";
import { Map_update } from "../../../(System)/Collections/Map";
import { requires } from "../../../(System)/Assert";
import { Stack } from "../../../(System)/Collections/Stack";
import { panic } from "../../../(System)/Errors";
import { from } from "../../../(System)/Collections/Sequence";

import { BoncleTagCollection, BoncleTagCollectionExpander, ReadonlyBoncleTagCollection } from "./TagCollection";
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

type  RuleMap = ReadonlyMap<BoncleTag, readonly BoncleTagRule[]>;
const RuleMap =         Map<BoncleTag,          BoncleTagRule[]>;

export class BoncleTagSystem {
    readonly stats: {
        readonly setCount: number;
        readonly tagCount: number;
        readonly standardRuleCount: number;
        readonly impliedRuleCount: number;
    };
    
    private readonly rulesByAntecendent: RuleMap;
    
    constructor() {
        const tags  = [...BoncleTag];
        const rules = [...BoncleTagStandardRules, ...BoncleTagImpliedRules];
        
        const rba = new RuleMap;
        
        for (const tag of tags) {
            rba.set(tag, []);
        }
        
        for (const rule of rules) {
            rba.get(rule.antecedent)!.push(rule);
        }
        
        this.rulesByAntecendent = rba;
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
    
    /** Gets all rules with the given antecedent. */
    private getRules(antecedent: BoncleTag): Iterable<BoncleTagRule> {
        return this.rulesByAntecendent.get(antecedent) ?? panic();
    }
    
    /** @bound */
    expand: BoncleTagCollectionExpander = rootTags => {
        const result = new BoncleTagCollection(rootTags);
        
        /** 
         * All tags recently touched. 
         * (Queue would be nicer, but a stack is faster.) 
         */
        const frontier: Stack<BoncleTag> = [...result];
        
        let current: BoncleTag | undefined;
        while (current = frontier.pop()) {
            for (const rule of this.getRules(current)) {
                for (const touched of result.applyRule(rule)) {
                    frontier.push(touched);
                }
            }
        }
        
        return result;
    }
    
    ////////////////////////////////
    // implements StringBuildable //
    ////////////////////////////////
    
    buildString(builder: StringBuilder, displayHidden: boolean): void {
        builder.appendLine(`BoncleTagSystem contents:`);
        
        builder.indent();
        for (const rules of this.rulesByAntecendent.values()) {
            for (const rule of rules) {
                rule.buildString(builder, true);
            }
        }
        builder.dedent();
    }
    
    toString(displayHidden = false): string {
        return StringBuilder.stringify(this, displayHidden);
    }
}
