import { from } from "../../../../(System)/Collections/Sequence";
import { fst, snd } from "../../../../(System)/Function";

import { BoncleTag } from "./Tag";

/*
General idea:

Given
tags a b c d e
disjoint { b c d }

{ a0 b0 c0 } should expand to { a0 c0 }
i.e. search, and remove other tags

*/


// Reminder that Set keeps insertion order, and thus priority of tags
const exclusionGroupByTag = new Map<BoncleTag, ReadonlySet<BoncleTag>>;

for (const tag of BoncleTag.getRootObject()) {
    if (tag.isExclusive) {
        const exclusionGroup = 
            from(tag.children)
            .select(tag => tag.name)
            .toSet()
        ;
        
        for (const item of exclusionGroup) {
            exclusionGroupByTag.set(item, exclusionGroup);
        }
    }
}

export function BoncleTag_getExclusionGroup(self: BoncleTag): ReadonlySet<BoncleTag> | undefined{
    return exclusionGroupByTag.get(self);
}
