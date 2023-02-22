import { ChangeEventHandler, Dispatch, KeyboardEventHandler, memo, useCallback, useState } from "react";

import { from } from "../../../../(System)/Collections/Linq";

import { joinClasses } from "../../../../ReactFileClient/ClassHelper";

import { BoncleSetFilter } from "../../Domain/SetFilter";
import { BoncleTagLabel } from "../TagLabel";
import { BoncleTag } from "../../Domain/Definitions/Tag";

const publicTags = from(BoncleTag).where(BoncleTag.isPublic).toArray();

function getSuggestions(filter: BoncleSetFilter, limit: number): BoncleTag[] {
    const  rightMost = filter.lastTag;
    return rightMost ? (
        from(publicTags)
        .where(tag => tag.startsWith(rightMost))
        .take(limit)
        .toArray()
    ) : [];
}

export const BoncleTagSearch = memo((props: {
    readonly value: string;
    readonly onChange: Dispatch<string>;
}): JSX.Element => {
    const { value, onChange } = props;
    
    const filter       = BoncleSetFilter.fromString(value);
    const isIncomplete = !filter.isComplete;
    const prefix       = filter.lastTag;
    const suggestions  = getSuggestions(filter, 20);
    
    const input_onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
        onChange(event.target.value);
    }, [onChange]);
    
    return <div className={joinClasses(
        "BoncleTagSearch", 
        isIncomplete && "Incomplete",
    )}>
        <div className="Title">Search sets</div>
        <input className="Search" type="text" value={value} onChange={input_onChange}/>
        <div className="Suggestions">
            {suggestions.length > 0 ? suggestions.map(suggestion => 
            <BoncleTagLabel tag={suggestion} prefix={prefix}/>) : 
            "-"}
        </div>
        <div className="Error">
            {isIncomplete ?
            <div>
                Unknown tag{filter.incompleteTags.length > 1 && 's'} '{from(filter.incompleteTags).toString("', '")}'
            </div> : 
            "-"}
        </div>
    </div>
});
