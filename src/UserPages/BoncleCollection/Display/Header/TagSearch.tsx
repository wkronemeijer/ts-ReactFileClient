import { ChangeEvent, Dispatch, KeyboardEvent, memo, SetStateAction, useCallback } from "react";

import { from } from "../../../../(System)/Collections/Sequence";

import { joinClasses } from "../../../../ReactFileClient/ClassHelper";

import { BoncleTag, BoncleTag_normalize } from "../../Domain/Tag";
import { BoncleSetFilter } from "../../Domain/SetFilter";
import { BoncleTagLabel } from "../Label/Tag";

const publicTags = from(BoncleTag).where(BoncleTag.isPublic).toArray();

function getSuggestions(filter: BoncleSetFilter, limit: number): BoncleTag[] {
    const  rightMost = filter.lastTag;
    return rightMost ? (
        from(publicTags)
        .where(tag => {
            const normTag       = BoncleTag_normalize(tag);
            const normRightMost = BoncleTag_normalize(rightMost);
            return normTag.startsWith(normRightMost);
        })
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
    
    const Search_onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }, [onChange]);
    
    const autocompleteTag = suggestions.length === 1 ? suggestions[0] : undefined;
    
    const Search_onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Tab") {
            event.preventDefault(); // Sometimes blocking Tab is annoying
            if (prefix && autocompleteTag) {
                console.log(`Attempt autocomplete '${autocompleteTag}'.`);
                onChange(value.replace(prefix, autocompleteTag));
            }
        }
    }, [onChange, value, prefix, autocompleteTag]);
    
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
            onKeyDown={Search_onKeyDown}
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
