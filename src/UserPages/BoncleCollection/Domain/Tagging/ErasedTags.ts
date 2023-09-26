import { from } from "../../../../(System)/Collections/Sequence";

import { BoncleTag } from "./Tag";

export const BoncleTagErasedTags = 
    from(BoncleTag.getRootObject())
    .selectWhere(tag => tag.isErased && tag.name)
    .toSet()
;
