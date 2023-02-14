import { requires } from "../../../(System)/Assert";
import { Stack } from "../../../(System)/Collections/Stack";

import { BoncleSetNumber_hasInstance } from "./SetNumber";
import { BoncleTagStandardRules } from "./Definitions/StandardRules";
import { BoncleTagImpliedRules } from "./Definitions/ImpliedRules";
import { BoncleSetTemplate } from "./SetTemplate";
import { BoncleTagRule } from "./TagRule";
import { BoncleTagSet } from "./TagSet";
import { BoncleSet } from "./Set";
import { BoncleTag } from "./Definitions/StandardTags";
import { panic } from "../../../(System)/Errors";
import { StringBuilder } from "../../../(System)/Text/StringBuilder";
import { from } from "../../../(System)/Collections/Linq";

/*
The idea:

given tags a b c d e
rules a --> b, b --> c
then tl(a) == { a, b, c }

given tags b, d
set = tl(b) | tl(d) | ...
strings value equality to the rescue...


*/

type  TranslationMap = ReadonlyMap<BoncleTag, Iterable<BoncleTag>>;
const TranslationMap =         Map<BoncleTag, Iterable<BoncleTag>>;

const tags  = BoncleTag.values;
const rules = [...BoncleTagStandardRules, ...BoncleTagImpliedRules];

export class BoncleTagSystem {
    private readonly terminalsByTag: TranslationMap;
    
    private static createPartialMap(
        rules: readonly BoncleTagRule[],
    ): TranslationMap {
        const tagMap = new Map<BoncleTag, BoncleTag[]>;
        
        function getSequents(tag: BoncleTag): BoncleTag[] {
            let result = tagMap.get(tag);
            if (!result) {
                result = [];
                tagMap.set(tag, result);
            } 
            return result;
        } 
        
        for (const rule of rules) {
            // This may now contain duplicates
            // Unlikely however, and not an issue either way.
            getSequents(rule.antecedent).push(...rule.consequent);
        }
        
        return tagMap;
    }
    
    constructor() {        
        const tags  = [...BoncleTag];
        const rules = [...BoncleTagStandardRules, ...BoncleTagImpliedRules];
        
        const partialMap = BoncleTagSystem.createPartialMap(rules);
        const   totalMap = new TranslationMap; // goal
        
        const nil = new Array<BoncleTag>;
        const consequents = (tag: BoncleTag): Iterable<BoncleTag> => 
            partialMap.get(tag) ?? nil
        ;
        
        for (const tag of tags) {
            const terminals = new BoncleTagSet;
            
            // Depth-first because pop() is faster than shift()
            let current: BoncleTag | undefined;
            const frontier: Stack<BoncleTag> = [tag];
            while (current = frontier.pop()) {
                terminals.add(current);
                for (const nextTag of consequents(current)) {
                    if (!terminals.has(nextTag)) {
                        frontier.push(nextTag);
                    }
                }
            }
            
            totalMap.set(tag, terminals);
        }
        
        this.terminalsByTag = totalMap;
    }
    
    private getTerminals(tag: BoncleTag): Iterable<BoncleTag> {
        return this.terminalsByTag.get(tag) ?? panic(`Missing terminals for '${tag}' (every tag's terminals should include itself).`);
    }
    
    private expand(tagSet: BoncleTagSet): BoncleTagSet {
        const result = new BoncleTagSet;
        let n = 0;
        
        for (const tag of tagSet) {
            for (const terminal of this.getTerminals(tag)) {
                result.add(terminal);
                n++;
            }
        }
        console.log(`expand: add ${n} times`);
        
        return result;
    }
    
    instantiate = (template: BoncleSetTemplate): BoncleSet => {
        const id    = template.i;
        requires(BoncleSetNumber_hasInstance(id), () => `'${id}' is not a valid set number.`);
        const title = template.n;
        const tags  = this.expand(new Set(template.t));
        return new BoncleSet(id, title, tags);
    }
    
    buildString(builder: StringBuilder): void {
        builder.appendLine(`BoncleTagSystem contents:`);
        builder.indent();
        
        for (const [initial, terminals] of this.terminalsByTag) {
            builder.appendLine(`${initial} --> ${from(terminals).toString(' ')}`);
        }
        
        builder.dedent();
    }
    
    toString(): string {
        return StringBuilder.stringify(this);
    }
}
