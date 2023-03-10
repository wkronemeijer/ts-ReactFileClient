import { from } from "../../../../(System)/Collections/Sequence";

import { BoncleTagRule } from "../TagRule";
import { BoncleTag } from "./Tag";

export const BoncleTagDefaultRules = 
    from(BoncleTag.getRootObject())
    .selectWhere(tag => 
        tag.isDefault && 
        BoncleTagRule.default(tag.name)
    )
    .toArray()
;
