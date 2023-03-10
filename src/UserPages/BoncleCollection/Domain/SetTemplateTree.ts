import { collect } from "../../../(System)/Collections/Iterable";

import { BoncleTagCollection, ReadonlyBoncleTagCollection } from "./TagCollection";
import { BoncleTag, BoncleTag_Seperator } from "./Definitions/Tag";
import { BoncleTagRuleArrow } from "./TagRuleArrow";
import { BoncleSetTemplate } from "./SetTemplate";
import { identity } from "../../../(System)/Function";

export interface BoncleSetTemplateTree {
    [s: string]: 
        | BoncleSetTemplateTree 
        | readonly BoncleSetTemplate[]
    ;
}

function BoncleSetTemplate_applyContext(
    template: BoncleSetTemplate, 
    totalContext: ReadonlyBoncleTagCollection,
): BoncleSetTemplate {
    const resultTags   = new BoncleTagCollection(totalContext);
    const templateTags = template.t;
    
    if (templateTags instanceof Array) {
        resultTags.addRoots(templateTags);
    } else {
        resultTags.addCollection(templateTags);
    }
    
    return { ...template, t: resultTags };
}

const contextWeight = BoncleTagRuleArrow.getWeight("==>");
const delimiter     = BoncleTag_Seperator;
const checkTag      = BoncleTag.check;

export const BoncleSetTemplateTree_flatten = collect(function* recurse(
    parentBranch: BoncleSetTemplateTree,
    parentContext: ReadonlyBoncleTagCollection = new BoncleTagCollection,
): Iterable<BoncleSetTemplate> {
    let childKey, childBranch;
    for (childKey in parentBranch) {
        if (childBranch = parentBranch[childKey]) {
            const childContext = new BoncleTagCollection(parentContext);
            childContext.addRoots(childKey.split(delimiter).filter(identity).map(checkTag));
            childContext.weighDownAll(contextWeight);
            
            if (childBranch instanceof Array) {
                for (const set of childBranch) {
                    yield BoncleSetTemplate_applyContext(set, childContext);
                }
            } else {
                yield* recurse(childBranch, childContext);
            }
        }
    }
});
