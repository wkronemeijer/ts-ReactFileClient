import { BoncleTagRule } from "../TagRule";
import { BoncleTagRoot, BoncleTagTree } from "./TagTree";
import { BoncleTag } from "./Tag";
import { collect } from "../../../../(System)/Collections/Iterable";

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
})(undefined, BoncleTagRoot);
