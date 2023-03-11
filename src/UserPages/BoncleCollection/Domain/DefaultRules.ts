import { from } from "../../../(System)/Collections/Sequence";

import { BoncleRule } from "./Rule";
import { BoncleTag } from "./Tag";

export const BoncleTagDefaultRules = 
    from(BoncleTag.getRootObject())
    .selectWhere(tag => 
        tag.isDefault && 
        BoncleRule.default(tag.name)
    )
    .toArray()
;
