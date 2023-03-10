import { from } from "../../../../(System)/Collections/Sequence";

import { BoncleTagRule } from "../TagRule";
import { BoncleTag } from "./Tag";

export const BoncleTagImpliedRules = 
    from(BoncleTag.getRootObject())
    .selectWhere(tag => 
        tag.parent &&
        tag.parent.isOpen && 
        BoncleTagRule.implies(tag.name, tag.parent.name)
    )
    .toArray()
;
