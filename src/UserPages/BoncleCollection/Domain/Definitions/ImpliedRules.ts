import { collect } from "../../../../(System)/Collections/Iterable";

import { BoncleTagTree_Root, BoncleTagTree } from "./TagTree";
import { BoncleTagRule } from "../TagRule";
import { BoncleTag } from "./Tag";

export const BoncleTagImpliedRules: readonly BoncleTagRule[] = 
collect(function* recurse(
    parent: BoncleTag | undefined, 
    branch: BoncleTagTree,
): Iterable<BoncleTagRule> {
    let childBranch: BoncleTagTree | undefined;
    for (const key in branch) {
        const child = BoncleTag.check(key);
        
        if (parent) {
            yield new BoncleTagRule(child, [parent]);
        }
        if (childBranch = branch[key]) {
            yield* recurse(child, childBranch);
        }
    }
})(undefined, BoncleTagTree_Root);
