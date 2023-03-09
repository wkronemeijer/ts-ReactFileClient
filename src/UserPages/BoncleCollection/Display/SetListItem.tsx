import { memo, useCallback } from "react";

import { joinClasses } from "../../../ReactFileClient/ClassHelper";

import { BoncleSetSelection_Change } from "../Domain/SetSelection";
import { BoncleSetWidget_Element } from "./SetWidgets/Element";
import { BoncleSet } from "../Domain/Set";
import { useDelay } from "../../../ReactFileClient/Hooks/useDelay";

// TODO: What if you cache the resulting JSX?

function getDelay(set: BoncleSet): number {
    return (set.id % 10) * 100;
}

export const BoncleSetListItem = memo(function setListItem(props: {
    readonly set: BoncleSet;
    readonly isSelected: boolean;
    readonly setSelection: BoncleSetSelection_Change;
}): JSX.Element {
    const { set, isSelected, setSelection } = props;
    const { title, name } = set;
    
    const ready = useDelay(getDelay(set));
    
    const Preview_onClick = useCallback(() => 
        setSelection(selection => selection.toggle(set))
    , [set, setSelection]);
    
    return <>{ready && 
        <div 
            className={joinClasses(
                "BoncleSetListItem", 
                set.displayElement, 
                set.generation,
                isSelected && "Selected",
            )}
            style={{ backgroundImage: `url(${set.previewUrl})` }}
        >   
            <div className="Content">
                <div className="Header Flank">
                    <span className="Title">{title}</span>
                    <span className="Name">{name}</span>
                </div>
                <div className="Preview" onClick={Preview_onClick}>
                    <img
                        className="Media"
                        src={set.previewUrl} 
                        alt={set.previewAlt}
                        title={set.previewTitle}
                        draggable={false}
                    />
                </div>
                <div className="Footer Flank Widgets">
                    <a href={set.bricksetUrl}>brickset</a>
                    <span>{set.setNumber}</span>
                    <a href={set.bricklinkUrl}>bricklink</a>
                </div>
            </div>
        </div>}
    </>
});
