import { from } from "../../../(System)/Collections/Sequence";

import { BoncleRule } from "./Rule";
import { BoncleTag } from "./Tag";

export const BoncleTagImpliedRules = 
    from(BoncleTag.getRootObject())
    .selectWhere(tag => 
        tag.parent &&
        tag.parent.isOpen && 
        BoncleRule.implies(tag.name, tag.parent.name)
    )
    .toArray()
;
