import { memo, useMemo } from "react";
import { BoncleDatabase } from "../Domain/Database";

import { BoncleTag } from "../Domain/Definitions/Tag";

export const BoncleTagLabel = memo(function tagLabel(props: {
    readonly tag: BoncleTag;
    readonly prefix?: string;
}): JSX.Element {
    const { tag, prefix = "" } = props;
    
    const remaining = tag.startsWith(prefix) ? tag.slice(prefix.length) : "";
    
    const count = useMemo(() =>
        BoncleDatabase.getTagFrequency(tag)
    , [tag]);
    
    return <span className="BoncleTagLabel">
        <span className="Prefix">{prefix}</span>
        <span className="Main">{remaining}</span>
        <span className="Count">{count}</span>
    </span>
});
