import { memo } from "react";

import { BoncleTag } from "../../Domain/Definitions/Tag";

export const BoncleTagLabel = memo(function tagLabel(props: {
    readonly tag: BoncleTag;
    readonly prefix?: string;
}): JSX.Element {
    const { tag, prefix = "" } = props;
    
    const suffix = tag.startsWith(prefix) ? tag.slice(prefix.length) : "";
    
    return <span className="BoncleTagLabel">
        <span className="Prefix">{prefix}</span>
        <span className="Main">{suffix}</span>
    </span>
});
