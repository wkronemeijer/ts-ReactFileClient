import { StringBuilder } from "../../../../(System)/Text/StringBuilder";
import { Set_dequeue } from "../../../../(System)/Collections/Set";
import { compare } from "../../../../(System)/Traits/Comparable/Compare";
import { ensures } from "../../../../(System)/Assert";
import { panic } from "../../../../(System)/Errors";

import { BoncleTagCollection, BoncleTagCollection_Expander } from "./TagCollection";
import { BoncleTag_getExclusionGroup } from "./ExclusionGroup";
import { BoncleTagDefaultRules } from "./Rules/RuleSets/DefaultRules";
import { BoncleTagImpliedRules } from "./Rules/RuleSets/ImpliedRules";
import { BoncleTagCustomRules } from "../Definitions/CustomRules";
import { BoncleTagErasedTags } from "./ErasedTags";
import { BoncleRule } from "./Rules/Rule";
import { BoncleTag } from "./Tag";

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

type  RuleMap = ReadonlyMap<BoncleTag, readonly BoncleRule[]>;
const RuleMap =         Map<BoncleTag,          BoncleRule[]>;

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
        const rules = [
            ...BoncleTagDefaultRules,
            ...BoncleTagImpliedRules,
            ...BoncleTagCustomRules, 
        ].sort((a, b) => compare(a.weight, b.weight));
        
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
    
    private eraseTags(result: BoncleTagCollection) {
        for (const forbiddenTag of BoncleTagErasedTags) {
            result.remove(forbiddenTag);
        }
    }
    
    /** Gets all rules with the given antecedent. */
    private getRules(antecedent: BoncleTag): Iterable<BoncleRule> {
        return this.rulesByAntecendent.get(antecedent) ?? panic();
    }
    
    private applyRules(result: BoncleTagCollection) {
        const frontier: Set<BoncleTag> = new Set(result);
        
        let current;
        while (current = Set_dequeue(frontier)) {
            for (const rule of this.getRules(current)) {
                for (const touched of result.applyRule(rule)) {
                    frontier.add(touched);
                }
            }
        }
    }
    
    private excludeGroups(result: BoncleTagCollection) {
        const frontier = new Set(result);
        let current;
        while (current = Set_dequeue(frontier)) {
            const group = BoncleTag_getExclusionGroup(current);
            if (group) {
                const tagToKeep = result.search(group) ?? panic();
                for (const groupTag of group) {
                    if (groupTag !== tagToKeep) {
                        result.remove(groupTag);
                    }
                    frontier.delete(groupTag);
                }
            }
        }
    }
    
    /** @bound */
    expand: BoncleTagCollection_Expander = rootTags => {
        const result = new BoncleTagCollection(rootTags);
        
        this.eraseTags(result);
        this.applyRules(result);
        this.excludeGroups(result);
        
        ensures(result.search(BoncleTagErasedTags) === undefined);
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
