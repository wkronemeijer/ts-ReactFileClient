import { BoncleTagRule } from "../TagRule";
import { BoncleTag, BoncleTagRoot, BoncleTagTree } from "./StandardTags";

function *impliedRules_iter(parent: BoncleTag | undefined, branch: BoncleTagTree): Iterable<BoncleTagRule> {
    let childBranch: BoncleTagTree | undefined;
    for (const key in branch) {
        const child = BoncleTag.check(key);
        
        if (parent) {
            yield new BoncleTagRule(child, [parent]);
        }
        if (childBranch = branch[key]) {
            yield* impliedRules_iter(child, childBranch);
        }
    }
}

export const BoncleTagImpliedRules: readonly BoncleTagRule[] = 
    Array.from(impliedRules_iter(undefined, BoncleTagRoot))
;
