import { collect } from "../../../(System)/Collections/Iterable";

import { BoncleTag, BoncleTag_parseSet } from "./Tag";
import { BoncleSetTemplate } from "./SetTemplate";

export interface BoncleSetTemplateTree {
    [s: string]: 
        | BoncleSetTemplateTree 
        | readonly BoncleSetTemplate[]
    ;
}

////////////////////////////
// Context for flattening //
////////////////////////////

type  Context = readonly BoncleTag[];
const Context_Default: Context = [];

function Context_update(ctx: Context, string: string): Context {
    return [...ctx, ...BoncleTag_parseSet(string)];
}

function Context_apply(
    template: BoncleSetTemplate, 
    totalContext: Context,
): BoncleSetTemplate {
    return { ...template, t: [...totalContext, ...template.t] };
}

//////////////////
// Flatten tree //
//////////////////

export const BoncleSetTemplateTree_flatten = collect(function* recurse(
    parentBranch: BoncleSetTemplateTree,
    parentContext: Context = Context_Default,
): Iterable<BoncleSetTemplate> {
    let childKey, childBranch;
    for (childKey in parentBranch) {
        if (childBranch = parentBranch[childKey]) {
            const childContext = Context_update(parentContext, childKey);
            if (childBranch instanceof Array) {
                for (const set of childBranch) {
                    yield Context_apply(set, childContext);
                }
            } else {
                yield* recurse(childBranch, childContext);
            }
        }
    }
});
