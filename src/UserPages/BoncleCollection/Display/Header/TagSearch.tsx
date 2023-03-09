import { ChangeEvent, ChangeEventHandler, Dispatch, KeyboardEventHandler, memo, useCallback, useState } from "react";

import { from } from "../../../../(System)/Collections/Sequence";

import { joinClasses } from "../../../../ReactFileClient/ClassHelper";

import { BoncleSetFilter } from "../../Domain/SetFilter";
import { BoncleTagLabel } from "../Label/Tag";
import { BoncleTag } from "../../Domain/Definitions/Tag";

const publicTags = from(BoncleTag).where(BoncleTag.isPublic).toArray();

function getSuggestions(filter: BoncleSetFilter, limit: number): BoncleTag[] {
    const  rightMost = filter.lastTag;
    return rightMost ? (
        from(publicTags)
        .where(tag => BoncleTag.normalize(tag).startsWith(BoncleTag.normalize(rightMost)))
        .take(limit)
        .toArray()
    ) : [];
}

export const BoncleTagSearch = memo(function tagSearch(props: {
    readonly value: string;
    readonly onChange: Dispatch<string>;
}): JSX.Element {
    const { value, onChange } = props;
    
    const filter       = BoncleSetFilter.fromString(value);
    const isIncomplete = !filter.isComplete;
    const prefix       = filter.lastTag;
    const suggestions  = getSuggestions(filter, 20);
    
    const Search_onChange = useCallback((
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        onChange(event.target.value);
    }, [onChange]);
    
    const Clear_onClick = useCallback(() => {
        onChange("");
    }, [onChange]);
    
    return <div className={joinClasses(
        "BoncleTagSearch", 
        isIncomplete && "Incomplete",
    )}>
        <div className="Title">Search sets</div>
        <input 
            className="Search" 
            type="text" 
            value={value} 
            onChange={Search_onChange}
            size={1}
        />
        <div className="Suggestions">
            {suggestions.length > 0 && suggestions.map(suggestion => 
            <BoncleTagLabel 
                key={suggestion}
                tag={suggestion} 
                prefix={prefix?.length}
            />)}
        </div>
        <button className="Clear" onClick={Clear_onClick}>
            Clear
        </button>
        <div className="Error">
            {isIncomplete &&
            <div>
                Invalid tag{filter.incompleteTags.length > 1 && 's'} '{from(filter.incompleteTags).toString("', '")}'
            </div>}
        </div>
    </div>
});
