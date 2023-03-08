import { memo } from "react";

import { BoncleTag } from "../../Domain/Definitions/Tag";

export const BoncleTagLabel = memo(function tagLabel(props: {
    readonly tag: BoncleTag;
    readonly prefix?: number;
}): JSX.Element {
    const { tag, prefix: prefixLength = 0 } = props;
    
    const prefix = tag.slice(0, prefixLength);
    const suffix = tag.slice(prefixLength);
    
    return <span className="BoncleTagLabel">
        <span className="Prefix">{prefix}</span>
        <span className="Main">{suffix}</span>
    </span>
});
